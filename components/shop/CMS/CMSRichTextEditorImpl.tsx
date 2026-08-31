'use client';

import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface CMSRichTextEditorImplProps {
  value: string;
  onChange: (content: string) => void;
  modules?: any;
  formats?: string[];
  placeholder?: string;
  error?: boolean;
}

export default function CMSRichTextEditorImpl({
  value,
  onChange,
  modules,
  formats,
  placeholder,
}: CMSRichTextEditorImplProps) {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor) {
        const cleanContentText = (value || '').replace(/<[^>]*>/g, '').trim();
        if (!cleanContentText) {
          const currentText = editor.getText().trim();
          if (currentText.length > 0) {
            editor.setContents([]);
          }
        }
      }
    }
  }, [value]);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value || ''}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
    />
  );
}
