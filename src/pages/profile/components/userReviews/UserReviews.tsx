import { useCallback, useRef, useState } from "react";
import { getUserReviews } from "../../../../api/user";
import ModeratedReviewList from "../../../../components/moderatedReviewList/ModeratedReviewList";
import Pagination from "../../../../components/pagination/Pagination";
import { useFetch } from "../../../../hooks/useFetch";
import "./UserReviews.css";

const PAGE_SIZE = 10;

type UserReviewsProps = {
  userId: string;
  onReviewDeleted: () => void;
};

const UserReviews = ({ userId, onReviewDeleted }: UserReviewsProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const { data, loading, error, reload } = useFetch(
    useCallback(
      () => getUserReviews(userId, { page, pageSize: PAGE_SIZE }),
      [userId, page],
    ),
    { keepPreviousData: true },
  );

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={listRef}
      className={`user-reviews${loading ? " user-reviews-loading" : ""}`}
      aria-busy={loading}
    >
      <h2 className="user-reviews-title">Reseñas</h2>
      {!data && loading && (
        <p className="status-message">Cargando reseñas...</p>
      )}
      {error && (
        <p className="status-message">No se pudieron cargar las reseñas.</p>
      )}
      {!error && data?.items.length === 0 && (
        <p className="status-message">Todavía no reseñó nada.</p>
      )}
      {!error && data && data.items.length > 0 && (
        <>
          <ModeratedReviewList
            reviews={data.items}
            onReviewDeleted={() => {
              reload();
              onReviewDeleted();
            }}
          />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={changePage}
          />
        </>
      )}
    </section>
  );
};

export default UserReviews;
