'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Loader2,
  FileText,
  AlertCircle,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react';

import Modal from '@/components/common/Modal';
import CMSRichTextEditor from './CMSRichTextEditor';
import { CMSPageData } from './CMSTable';

interface CMSFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  pageToEdit?: CMSPageData | null;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="mt-1.5 p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold font-nunito flex items-center gap-2">
      <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function CMSFormModal({
  isOpen,
  onClose,
  onSuccess,
  pageToEdit,
}: CMSFormModalProps) {
  const isEditMode = Boolean(pageToEdit?.id);

  const [pageName, setPageName] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Important:
  // Changing this key forces ReactQuill to create a completely
  // new editor instance whenever the modal is opened.
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    // Force fresh ReactQuill instance
    setEditorKey((prev) => prev + 1);

    if (pageToEdit) {
      // EDIT MODE
      setPageName(pageToEdit.page_name || '');
      setSlug(pageToEdit.slug || '');
      setIsSlugManuallyEdited(true);
      setPageTitle(pageToEdit.page_title || '');
      setMetaDescription(pageToEdit.meta_description || '');
      setContent(pageToEdit.content || '');
      setStatus(pageToEdit.status || 'Active');
    } else {
      // ADD MODE
      setPageName('');
      setSlug('');
      setIsSlugManuallyEdited(false);
      setPageTitle('');
      setMetaDescription('');
      setContent('');
      setStatus('Active');
    }

    setErrors({});
    setGeneralError(null);
  }, [isOpen, pageToEdit]);

  // Auto-generate slug from Page Name
  const handlePageNameChange = (val: string) => {
    setPageName(val);

    setErrors((prev) => ({
      ...prev,
      pageName: '',
    }));

    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(val));

      setErrors((prev) => ({
        ...prev,
        slug: '',
      }));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlug(val);
    setIsSlugManuallyEdited(true);

    setErrors((prev) => ({
      ...prev,
      slug: '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!pageName.trim()) {
      newErrors.pageName = 'Page Name is required.';
    }

    if (!slug.trim()) {
      newErrors.slug = 'Slug is required.';
    } else if (!/^[a-z0-9-]+$/.test(slug.trim())) {
      newErrors.slug =
        'Slug can only contain lowercase letters, numbers, and hyphens.';
    }

    if (!pageTitle.trim()) {
      newErrors.pageTitle = 'Page Title is required.';
    }

    if (!metaDescription.trim()) {
      newErrors.metaDescription = 'Meta Description is required.';
    }

    // ReactQuill empty content can produce <p><br></p>
    const cleanContentText = content
      .replace(/<[^>]*>/g, '')
      .trim();

    if (!content.trim() || !cleanContentText) {
      newErrors.content = 'Content is required.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        page_name: pageName.trim(),
        slug: generateSlug(slug),
        page_title: pageTitle.trim(),
        meta_description: metaDescription.trim(),
        content: content.trim(),
        status,
      };

      const url = isEditMode
        ? `/api/shop/cms/${pageToEdit!.id}`
        : '/api/shop/cms';

      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setGeneralError(
          data.error || 'Failed to save CMS page.'
        );
        return;
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error submitting CMS page:', err);

      setGeneralError(
        err.message ||
        'An unexpected error occurred while saving.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidthClass="max-w-3xl"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#E2EAE1] flex items-center justify-between bg-[#F9FBF9]">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#EAF2EA] text-[#2D5A27] shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>

          <div>
            <h3 className="text-lg font-bold font-quicksand text-[#2D5A27]">
              {isEditMode ? 'Edit CMS Page' : 'Add CMS Page'}
            </h3>

            <p className="text-xs text-gray-500 font-nunito">
              Configure website page titles, meta info, SEO slug,
              and rich content.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 space-y-4 font-nunito max-h-[80vh] overflow-y-auto"
      >
        {/* General Error */}
        {generalError && (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5 shadow-2xs">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Page Name + Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Page Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 font-quicksand">
              Page Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={pageName}
              onChange={(e) =>
                handlePageNameChange(e.target.value)
              }
              placeholder="e.g. About Us"
              className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none transition ${errors.pageName
                ? 'border-red-400 bg-red-50/20 ring-4 ring-red-500/10'
                : 'border-[#E2EAE1] hover:border-gray-300 focus:ring-4 focus:ring-[#2D5A27]/10 focus:border-[#2D5A27]'
                }`}
            />

            <FieldError message={errors.pageName} />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 font-quicksand">
              Slug <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs text-gray-400 font-mono">
                /
              </div>

              <input
                type="text"
                value={slug}
                onChange={(e) =>
                  handleSlugChange(e.target.value)
                }
                placeholder="e.g. about-us"
                className={`w-full pl-6 pr-4 py-2.5 bg-white border rounded-xl text-sm font-mono focus:outline-none transition ${errors.slug
                  ? 'border-red-400 bg-red-50/20 ring-4 ring-red-500/10'
                  : 'border-[#E2EAE1] hover:border-gray-300 focus:ring-4 focus:ring-[#2D5A27]/10 focus:border-[#2D5A27]'
                  }`}
              />
            </div>

            <FieldError message={errors.slug} />
          </div>
        </div>

        {/* Page Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1 font-quicksand">
            Page Title (SEO Title){' '}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={pageTitle}
            onChange={(e) => {
              setPageTitle(e.target.value);

              setErrors((prev) => ({
                ...prev,
                pageTitle: '',
              }));
            }}
            placeholder="e.g. About Us - Grace Fresh Market | Fresh Organic Produce"
            className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none transition ${errors.pageTitle
              ? 'border-red-400 bg-red-50/20 ring-4 ring-red-500/10'
              : 'border-[#E2EAE1] hover:border-gray-300 focus:ring-4 focus:ring-[#2D5A27]/10 focus:border-[#2D5A27]'
              }`}
          />

          <FieldError message={errors.pageTitle} />
        </div>

        {/* Meta Description */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 font-quicksand">
              Meta Description{' '}
              <span className="text-red-500">*</span>
            </label>

            <span className="text-[11px] font-semibold text-gray-400 font-mono">
              {metaDescription.length} characters
            </span>
          </div>

          <textarea
            rows={3}
            value={metaDescription}
            onChange={(e) => {
              setMetaDescription(e.target.value);

              setErrors((prev) => ({
                ...prev,
                metaDescription: '',
              }));
            }}
            placeholder="Provide a concise summary for search engine results..."
            className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none transition ${errors.metaDescription
              ? 'border-red-400 bg-red-50/20 ring-4 ring-red-500/10'
              : 'border-[#E2EAE1] hover:border-gray-300 focus:ring-4 focus:ring-[#2D5A27]/10 focus:border-[#2D5A27]'
              }`}
          />

          <FieldError message={errors.metaDescription} />
        </div>

        {/* Page Content */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-quicksand">
            Page Content{' '}
            <span className="text-red-500">*</span>
          </label>

          <CMSRichTextEditor
            value={content}
            onChange={(val: string) => {
              setContent(val);

              setErrors((prev) => ({
                ...prev,
                content: '',
              }));
            }}
            error={Boolean(errors.content)}
          />

          <FieldError message={errors.content} />
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-quicksand">
            Status <span className="text-red-500">*</span>
          </label>

          <div className="grid grid-cols-2 gap-3">
            {/* Active */}
            <button
              type="button"
              onClick={() => setStatus('Active')}
              className={`py-2.5 px-4 rounded-xl border text-xs font-bold font-quicksand flex items-center justify-center gap-2 transition cursor-pointer ${status === 'Active'
                ? 'bg-emerald-50 border-emerald-600 text-emerald-800 ring-2 ring-emerald-600/20'
                : 'bg-white border-[#E2EAE1] text-gray-600 hover:bg-gray-50'
                }`}
            >
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Active
            </button>

            {/* Inactive */}
            <button
              type="button"
              onClick={() => setStatus('Inactive')}
              className={`py-2.5 px-4 rounded-xl border text-xs font-bold font-quicksand flex items-center justify-center gap-2 transition cursor-pointer ${status === 'Inactive'
                ? 'bg-gray-100 border-gray-500 text-gray-800 ring-2 ring-gray-400/20'
                : 'bg-white border-[#E2EAE1] text-gray-600 hover:bg-gray-50'
                }`}
            >
              <X className="w-4 h-4 text-gray-500" />
              Inactive
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E2EAE1] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl border border-[#E2EAE1] bg-white hover:bg-gray-50 text-gray-700 font-quicksand font-bold text-xs sm:text-sm transition disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#21431d] text-white font-quicksand font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>
                {isEditMode ? 'Update Page' : 'Save Page'}
              </span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}