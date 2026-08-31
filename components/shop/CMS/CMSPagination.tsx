'use client';

import React from 'react';
import Pagination from '@/components/common/Pagination';

interface CMSPaginationProps {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function CMSPagination({
  page,
  limit,
  total,
  totalPages,
  onPageChange,
}: CMSPaginationProps) {
  return (
    <Pagination
      page={page}
      limit={limit}
      total={total}
      totalPages={totalPages}
      onPageChange={onPageChange}
      itemName="pages"
    />
  );
}
