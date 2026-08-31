'use client';

import React from 'react';
import { Pencil, Trash2, ExternalLink, FileText, AlertCircle, Plus } from 'lucide-react';

export interface CMSPageData {
  id: number;
  page_name: string;
  slug: string;
  page_title: string;
  meta_description: string;
  content: string;
  status: 'Active' | 'Inactive';
  created_at?: string;
  updated_at?: string;
}

interface CMSTableProps {
  pages: CMSPageData[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  statusFilter: string;
  onEdit: (page: CMSPageData) => void;
  onDelete: (page: CMSPageData) => void;
  onAddClick: () => void;
  onRetry: () => void;
}

export default function CMSTable({
  pages,
  loading,
  error,
  searchQuery,
  statusFilter,
  onEdit,
  onDelete,
  onAddClick,
  onRetry,
}: CMSTableProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  // 1. Error State
  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-8 text-center shadow-2xs font-nunito">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold font-quicksand text-gray-900 mb-1">
          Unable to Load CMS Pages
        </h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#2D5A27] text-white text-xs font-bold font-quicksand rounded-xl hover:bg-[#21431d] transition cursor-pointer"
        >
          Try Again
        </button>
      </div>
    );
  }

  // 2. Skeleton Loading State
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#E2EAE1] overflow-hidden shadow-2xs">
        {/* Desktop Skeleton */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse font-nunito">
            <thead>
              <tr className="bg-[#F9FBF9] border-b border-[#E2EAE1] text-[11px] font-bold uppercase tracking-wider text-gray-500 font-quicksand">
                <th className="py-3.5 px-4 w-16">ID</th>
                <th className="py-3.5 px-4">Page Name</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Updated At</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2EAE1]">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 px-4">
                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="h-7 bg-gray-200 rounded-lg w-16 ml-auto"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Skeleton Stack */}
        <div className="block md:hidden divide-y divide-[#E2EAE1] p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-[#F9FBF9] rounded-xl animate-pulse space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
                <div className="h-5 bg-gray-200 rounded-full w-14"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-36"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Empty State
  if (pages.length === 0) {
    const isFiltered = Boolean(searchQuery || (statusFilter && statusFilter !== 'All'));

    return (
      <div className="bg-white rounded-2xl border border-[#E2EAE1] p-12 text-center shadow-2xs font-nunito">
        <div className="w-16 h-16 rounded-2xl bg-[#EAF2EA] text-[#2D5A27] flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold font-quicksand text-gray-900 mb-1">
          {isFiltered ? 'No matching pages found' : 'No CMS pages yet'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6">
          {isFiltered
            ? `We couldn't find any pages matching your current search or status filter. Try clearing filters.`
            : 'Get started by creating your first CMS content page.'}
        </p>

        {isFiltered ? (
          <button
            onClick={onRetry}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold font-quicksand rounded-xl transition cursor-pointer"
          >
            Reset Filters
          </button>
        ) : (
          <button
            onClick={onAddClick}
            className="px-5 py-2.5 bg-[#2D5A27] hover:bg-[#21431d] text-white text-xs sm:text-sm font-bold font-quicksand rounded-xl inline-flex items-center gap-2 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Page</span>
          </button>
        )}
      </div>
    );
  }

  // 4. Data Render (Desktop Table + Mobile Key-Value Card Layout)
  return (
    <div className="bg-white rounded-2xl border border-[#E2EAE1] overflow-hidden shadow-2xs font-nunito">
      {/* --- Desktop View (Table Layout) --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FBF9] border-b border-[#E2EAE1] text-[11px] font-bold uppercase tracking-wider text-gray-500 font-quicksand">
              <th className="py-3.5 px-4 w-16">ID</th>
              <th className="py-3.5 px-4">Page Name</th>
              <th className="py-3.5 px-4">Slug</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Updated At</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2EAE1] text-xs font-medium text-gray-700">
            {pages.map((page) => (
              <tr
                key={page.id}
                className="hover:bg-[#F9FBF9] transition-colors group"
              >
                {/* ID */}
                <td className="py-4 px-4 font-mono font-bold text-gray-500">
                  #{page.id}
                </td>

                {/* Page Name */}
                <td className="py-4 px-4">
                  <div className="font-bold text-gray-900 font-quicksand text-sm group-hover:text-[#2D5A27] transition-colors">
                    {page.page_name}
                  </div>
                  <div className="text-[11px] text-gray-400 truncate max-w-xs mt-0.5">
                    {page.page_title}
                  </div>
                </td>

                {/* Slug */}
                <td className="py-4 px-4">
                  <a
                    href={`/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-[#2D5A27] hover:underline bg-[#EAF2EA]/60 hover:bg-[#EAF2EA] px-2.5 py-1 rounded-lg border border-[#2D5A27]/10 transition"
                    title="View public page"
                  >
                    <span>/{page.slug}</span>
                    <ExternalLink className="w-3 h-3 text-[#2D5A27]" />
                  </a>
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  {page.status === 'Active' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-quicksand bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-quicksand bg-gray-100 text-gray-600 border border-gray-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                      Inactive
                    </span>
                  )}
                </td>

                {/* Updated At */}
                <td className="py-4 px-4 text-gray-500 text-[11px]">
                  {formatDate(page.updated_at)}
                </td>

                {/* Action */}
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(page)}
                      className="px-2.5 py-1 text-xs font-bold font-quicksand text-[#2D5A27] bg-[#EAF2EA] hover:bg-[#2D5A27] hover:text-white rounded-lg inline-flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
                      title="Edit page"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(page)}
                      className="px-2.5 py-1 text-xs font-bold font-quicksand text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-lg inline-flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
                      title="Delete page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile View (Key-Value Row-by-Row Card Layout) --- */}
      <div className="block md:hidden divide-y divide-[#E2EAE1]">
        {pages.map((page) => (
          <div key={page.id} className="p-4 space-y-2.5 bg-white hover:bg-[#F9FBF9] transition font-nunito text-xs">
            {/* ID */}
            <div className="flex items-center justify-between py-1 border-b border-gray-100">
              <span className="font-bold text-gray-500 font-quicksand uppercase text-[11px] tracking-wider">ID</span>
              <span className="font-mono font-bold text-gray-700">#{page.id}</span>
            </div>

            {/* Page Name */}
            <div className="flex items-start justify-between py-1 border-b border-gray-100">
              <span className="font-bold text-gray-500 font-quicksand uppercase text-[11px] tracking-wider shrink-0 w-24">Page Name</span>
              <div className="text-right">
                <div className="font-bold text-gray-900 font-quicksand text-xs">{page.page_name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{page.page_title}</div>
              </div>
            </div>

            {/* Slug */}
            <div className="flex items-center justify-between py-1 border-b border-gray-100">
              <span className="font-bold text-gray-500 font-quicksand uppercase text-[11px] tracking-wider">Slug</span>
              <a
                href={`/${page.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-[#2D5A27] hover:underline bg-[#EAF2EA]/60 px-2 py-0.5 rounded border border-[#2D5A27]/10"
              >
                <span>/{page.slug}</span>
                <ExternalLink className="w-3 h-3 text-[#2D5A27]" />
              </a>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between py-1 border-b border-gray-100">
              <span className="font-bold text-gray-500 font-quicksand uppercase text-[11px] tracking-wider">Status</span>
              {page.status === 'Active' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-quicksand bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-quicksand bg-gray-100 text-gray-600 border border-gray-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  Inactive
                </span>
              )}
            </div>

            {/* Updated At */}
            <div className="flex items-center justify-between py-1 border-b border-gray-100">
              <span className="font-bold text-gray-500 font-quicksand uppercase text-[11px] tracking-wider">Updated At</span>
              <span className="text-gray-500 text-[11px]">{formatDate(page.updated_at)}</span>
            </div>

            {/* Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-gray-500 font-quicksand uppercase text-[11px] tracking-wider">Action</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(page)}
                  className="px-3.5 py-1.5 text-xs font-bold font-quicksand text-[#2D5A27] bg-[#EAF2EA] hover:bg-[#2D5A27] hover:text-white rounded-xl inline-flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDelete(page)}
                  className="px-3.5 py-1.5 text-xs font-bold font-quicksand text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-xl inline-flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
