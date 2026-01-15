import {
  Pagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";


/*
 * @GetPaginationProps
 * @description Get pagination props
 * @param page {number} The page
 * @param perPage {number} The per page
 * @param totalPages {number} The total pages
 * @param handlePageChange {Function} The handle page change
 * */
interface GetPaginationProps {
  page: number;
  perPage: number;
  totalPages: number;
  handlePageChange: (page: number) => (e: React.MouseEvent) => void;
}

/*
 * @GetPagination
 * @description Get pagination
 * @param totalPages {number} The total pages
 * */
export default function GetPagination({
  page,
  totalPages,
  handlePageChange,
}: GetPaginationProps) {
  return (
    <Pagination>
      <PaginationPrevious
        onClick={handlePageChange(page - 1)}
        aria-disabled={page === 1}
        className={page === 1 ? "pointer-events-none opacity-50" : ""}
      />
      {[...Array(totalPages)].map((_, i: number) => {
        const currentPage: number = i + 1;
        return (
          <PaginationLink
            key={currentPage}
            isActive={page === currentPage}
            onClick={handlePageChange(currentPage)}
          >
            {currentPage}
          </PaginationLink>
        );
      })}
      <PaginationNext
        onClick={handlePageChange(page + 1)}
        aria-disabled={page === totalPages}
        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
      />
    </Pagination>
  );
}
