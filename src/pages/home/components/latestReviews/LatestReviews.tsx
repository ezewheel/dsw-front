import { useCallback, useRef, useState } from "react";
import { getLatestReviews } from "../../../../api/reviews";
import Pagination from "../../../../components/pagination/Pagination";
import ModeratedReviewList from "../../../../components/moderatedReviewList/ModeratedReviewList";
import { useFetch } from "../../../../hooks/useFetch";
import "./LatestReviews.css";

const PAGE_SIZE = 5;

const LatestReviews = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const { data, loading, error, reload } = useFetch(
    useCallback(() => getLatestReviews({ page, pageSize: PAGE_SIZE }), [page]),
    { keepPreviousData: true },
  );

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="latest-reviews">
      <h2 className="section-title">Últimas reseñas</h2>

      <div
        ref={listRef}
        className={`latest-reviews-list${loading ? " latest-reviews-list-loading" : ""}`}
        aria-busy={loading}
      >
        {!data && loading && (
          <p className="status-message">Cargando reseñas...</p>
        )}
        {error && (
          <p className="status-message">No se pudieron cargar las reseñas.</p>
        )}
        {!error && data?.items.length === 0 && (
          <p className="status-message">
            Todavía no hay reseñas. ¡Sé el primero!
          </p>
        )}
        {!error && data && data.items.length > 0 && (
          <>
            <ModeratedReviewList
              reviews={data.items}
              onReviewDeleted={reload}
            />
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={changePage}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default LatestReviews;
