import { useCallback, useRef, useState } from "react";
import type { MusicalEntityType } from "../../api/musical-entity";
import { getEntityReviews } from "../../api/reviews";
import { useFetch } from "../../hooks/useFetch";
import { formatDate } from "../../utils/format";
import Pagination from "../pagination/Pagination";
import StarRating from "../starRating/StarRating";
import "./ReviewList.css";

const PAGE_SIZE = 10;

type ReviewListProps = {
  entityType: MusicalEntityType;
  externalId: string;
};

const ReviewList = ({ entityType, externalId }: ReviewListProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const { data, loading, error } = useFetch(
    useCallback(
      () =>
        getEntityReviews(entityType, externalId, { page, pageSize: PAGE_SIZE }),
      [entityType, externalId, page],
    ),
    { keepPreviousData: true },
  );

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!data && loading) {
    return <p className="status-message">Cargando reseñas...</p>;
  }

  if (error) {
    return (
      <p className="status-message">No se pudieron cargar las reseñas.</p>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <p className="status-message">
        Todavía no hay reseñas para esta entidad. ¡Sé el primero!
      </p>
    );
  }

  return (
    <div
      ref={listRef}
      className={`review-list${loading ? " review-list-loading" : ""}`}
      aria-busy={loading}
    >
      <div className="review-list-items">
        {data.items.map((review) => (
          <article className="review-list-item" key={review.id}>
            <span className="review-list-avatar" aria-hidden="true">
              {review.user.nickname.charAt(0).toUpperCase()}
            </span>
            <div className="review-list-body">
              <div className="review-list-header">
                <span className="review-list-author">
                  {review.user.nickname}
                </span>
                <StarRating value={review.value} readOnly size="sm" />
              </div>
              <p className="review-list-text">{review.content}</p>
              <span className="review-list-date">
                {formatDate(review.updatedAt)}
              </span>
            </div>
          </article>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={changePage}
      />
    </div>
  );
};

export default ReviewList;
