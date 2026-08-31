'use client';

import React from 'react';
import { RefreshCw, Filter } from 'lucide-react';
import SearchInput from '@/components/common/SearchInput';

interface CMSFiltersProps {
  search: string;
  status: string;
  loading: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (status: string) => void;
  onRefresh: () => void;
}

export default function CMSFilters({
  search,
  status,
  loading,
  onSearchChange,
  onStatusChange,
  onRefresh,
}: CMSFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E2EAE1] shadow-2xs">
      <SearchInput
        value={search}
        placeholder="Search pages by name, slug, or title..."
        onSearch={onSearchChange}
        className="w-full sm:max-w-md"
      />

      <div className="flex items-center gap-3 justify-between sm:justify-end font-nunito">
        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 hidden sm:inline" />
          <span className="text-xs font-bold text-gray-500 font-quicksand hidden sm:inline">Status:</span>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3.5 py-2.5 bg-white border border-[#E2EAE1] rounded-xl text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] focus:border-transparent transition shadow-2xs cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2.5 rounded-xl border border-[#E2EAE1] bg-white hover:bg-[#F2F7F2] hover:text-[#2D5A27] text-gray-600 transition cursor-pointer disabled:opacity-50"
          title="Refresh CMS pages"
          type="button"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#2D5A27]' : ''}`} />
        </button>
      </div>
    </div>
  );
}
