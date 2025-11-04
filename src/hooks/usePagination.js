// src/hooks/usePagination.js
import { useState } from 'react';
import { DEFAULT_CONFIG } from '../constants';

export const usePagination = (initialPage = DEFAULT_CONFIG.PAGINATION.DEFAULT_PAGE) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (newPage, totalPages) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const resetPage = () => {
    setCurrentPage(DEFAULT_CONFIG.PAGINATION.DEFAULT_PAGE);
  };

  return {
    currentPage,
    setCurrentPage,
    handlePageChange,
    resetPage,
  };
};