import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { MusicalEntityType } from "../../api/musical-entity";
import { getEntityReviews } from "../../api/reviews";
import { useFetch } from "../../hooks/useFetch";
import Pagination from "../pagination/Pagination";
import ReviewForm from "../reviewForm/ReviewForm";
import ModeratedReviewList from "../moderatedReviewList/ModeratedReviewList";
import {
  focusReviewFormOnceSettled,
  REVIEW_FORM_ID,
} from "../../utils/review-form";
import "./EntityReviews.css";

const PAGE_SIZE = 10;

type EntityReviewsProps = {
  entityType: MusicalEntityType;
  externalId: string;
  onReviewChange: () => void;
};

const EntityReviews = ({
  entityType,
  externalId,
  onReviewChange,
}: EntityReviewsProps) => {
  const { hash } = useLocation();
  const listRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (hash === `#${REVIEW_FORM_ID}`) return focusReviewFormOnceSettled();
  }, [hash]);

  const { data, loading, error, reload } = useFetch(
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

  const handleReviewChange = () => {
    setPage(1);
    reload();
    onReviewChange();
  };

  return (
    <section className="entity-reviews">
      <div className="entity-reviews-layout">
        <div id={REVIEW_FORM_ID} className="entity-reviews-form" tabIndex={-1}>
          <ReviewForm
            entityType={entityType}
            externalId={externalId}
            onChange={handleReviewChange}
          />
        </div>
        <div
          ref={listRef}
          className={`entity-reviews-list${loading ? " entity-reviews-list-loading" : ""}`}
          aria-busy={loading}
        >
          <h2 className="entity-reviews-title">Reseñas</h2>
          {!data && loading && (
            <p className="status-message">Cargando reseñas...</p>
          )}
          {error && (
            <p className="status-message">No se pudieron cargar las reseñas.</p>
          )}
          {!error && data?.items.length === 0 && (
            <p className="status-message">
              Todavía no hay reseñas. ¡Sé el primero en dejar una!
            </p>
          )}
          {!error && data && data.items.length > 0 && (
            <>
              <ModeratedReviewList
                reviews={data.items}
                onReviewDeleted={() => {
                  reload();
                  onReviewChange();
                }}
              />
              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={changePage}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default EntityReviews;
