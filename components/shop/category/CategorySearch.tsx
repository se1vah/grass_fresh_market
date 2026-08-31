'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface CategorySearchProps {
  initialValue?: string;
  onSearch: (value: string) => void;
}

export default function CategorySearch({ initialValue = '', onSearch }: CategorySearchProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 350); // 350ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search categories by name..."
        className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E2EAE1] rounded-xl text-sm font-nunito placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent transition shadow-xs"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
