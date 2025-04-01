import { useState, useEffect } from "react";

export function usePagination({ totalItems, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (totalItems != null) {
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
    }
  }, [totalItems, itemsPerPage]);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page) =>
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    startIndex,
    endIndex,
    pages,
  };
}
