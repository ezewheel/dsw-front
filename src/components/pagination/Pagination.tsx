import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  windowSize?: number;
};

function getPageWindow(current: number, windowSize: number): number[] {
  const start = Math.max(1, current - Math.floor(windowSize / 2));
  return Array.from({ length: windowSize }, (_, i) => start + i);
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  windowSize = 5,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(currentPage, windowSize);

  return (
    <nav className="pagination" aria-label="Paginación de resultados">
      <button
        type="button"
        className="pagination-arrow"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="Primera página"
      >
        <FaAngleDoubleLeft />
      </button>

      <button
        type="button"
        className="pagination-arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <FaChevronLeft />
      </button>

      {pages.map((page) => {
        const isOutOfRange = page > totalPages;
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            className={`pagination-page${isActive ? " is-active" : ""}`}
            onClick={() => onPageChange(page)}
            disabled={isOutOfRange}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        className="pagination-arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        <FaChevronRight />
      </button>

      <button
        type="button"
        className="pagination-arrow"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Última página"
      >
        <FaAngleDoubleRight />
      </button>
    </nav>
  );
};

export default Pagination;
