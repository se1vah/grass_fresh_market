'use client';

import React from 'react';
import { FileText, Plus } from 'lucide-react';

interface CMSHeaderProps {
  onAddClick: () => void;
}

export default function CMSHeader({ onAddClick }: CMSHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-[#EAF2EA] text-[#2D5A27] shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold font-quicksand text-gray-900 tracking-tight">
            CMS
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 font-nunito mt-1">
          Manage website pages and content
        </p>
      </div>

      <button
        onClick={onAddClick}
        className="px-4 py-2.5 bg-[#2D5A27] hover:bg-[#21431d] text-white font-quicksand font-bold text-xs sm:text-sm rounded-xl inline-flex items-center justify-center gap-2 shadow-xs hover:shadow transition cursor-pointer self-start sm:self-auto"
      >
        <Plus className="w-4 h-4" />
        <span>Add Page</span>
      </button>
    </div>
  );
}
