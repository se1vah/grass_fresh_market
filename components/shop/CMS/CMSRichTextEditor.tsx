'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const CMSRichTextEditorImpl = dynamic(
  () => import('./CMSRichTextEditorImpl'),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 w-full flex items-center justify-center bg-[#F9FBF9] border border-[#E2EAE1] rounded-xl text-xs text-gray-500 font-semibold font-nunito animate-pulse">
        Loading Rich Text Editor...
      </div>
    ),
  }
);

interface CMSRichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  error?: boolean;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    ['link'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'list',
  'align',
  'blockquote',
  'code-block',
  'link',
];

export default function CMSRichTextEditor({
  value,
  onChange,
  placeholder = 'Write page content here...',
  error = false,
}: CMSRichTextEditorProps) {
  return (
    <div
      className={`rich-text-editor-container rounded-xl transition ${error ? 'border border-red-400 bg-red-50/10' : ''
        }`}
    >
      <style jsx global>{`
        .rich-text-editor-container .ql-toolbar.ql-snow {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border-color: ${error ? '#FCA5A5' : '#E2EAE1'};
          background-color: #F9FBF9;
          font-family: var(--font-nunito), sans-serif;
        }

        .rich-text-editor-container .ql-container.ql-snow {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border-color: ${error ? '#FCA5A5' : '#E2EAE1'};
          min-height: 220px;
          font-family: var(--font-nunito), sans-serif;
          font-size: 0.9375rem;
        }

        .rich-text-editor-container .ql-editor {
          min-height: 220px;
          max-height: 450px;
          overflow-y: auto;
          line-height: 1.6;
        }

        .rich-text-editor-container .ql-editor.ql-blank::before {
          color: #9CA3AF;
          font-style: normal;
        }

        .rich-text-editor-container .ql-snow .ql-picker {
          color: #374151;
        }

        .rich-text-editor-container .ql-snow .ql-stroke {
          stroke: #4B5563;
        }

        .rich-text-editor-container .ql-snow .ql-fill {
          fill: #4B5563;
        }

        .rich-text-editor-container .ql-snow.ql-toolbar button:hover,
        .rich-text-editor-container .ql-snow .ql-toolbar button:hover,
        .rich-text-editor-container .ql-snow.ql-toolbar button.ql-active,
        .rich-text-editor-container .ql-snow .ql-toolbar button.ql-active {
          color: #2D5A27;
        }

        .rich-text-editor-container .ql-snow.ql-toolbar button:hover .ql-stroke,
        .rich-text-editor-container .ql-snow .ql-toolbar button:hover .ql-stroke,
        .rich-text-editor-container .ql-snow.ql-toolbar button.ql-active .ql-stroke,
        .rich-text-editor-container .ql-snow .ql-toolbar button.ql-active .ql-stroke {
          stroke: #2D5A27;
        }

        .rich-text-editor-container .ql-snow.ql-toolbar button:hover .ql-fill,
        .rich-text-editor-container .ql-snow .ql-toolbar button:hover .ql-fill,
        .rich-text-editor-container .ql-snow.ql-toolbar button.ql-active .ql-fill,
        .rich-text-editor-container .ql-snow .ql-toolbar button.ql-active .ql-fill {
          fill: #2D5A27;
        }
      `}</style>

      <CMSRichTextEditorImpl
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        error={error}
      />
    </div>
  );
}