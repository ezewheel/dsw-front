import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "./Pagination.css";

const WINDOW_SIZE = 5;

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPageWindow(current: number, totalPages: number): number[] {
  const lastStart = Math.max(1, totalPages - WINDOW_SIZE + 1);
  const centeredStart = current - Math.floor(WINDOW_SIZE / 2);
  const start = Math.min(Math.max(1, centeredStart), lastStart);
  const length = Math.min(WINDOW_SIZE, totalPages - start + 1);
  return Array.from({ length }, (_, i) => start + i);
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = getPageWindow(currentPage, totalPages);

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
        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            className={`pagination-page${isActive ? " is-active" : ""}`}
            onClick={() => onPageChange(page)}
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
