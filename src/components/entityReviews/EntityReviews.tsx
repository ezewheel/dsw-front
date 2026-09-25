import { useCallback, useState } from "react";
import type { MusicalEntityType } from "../../api/musical-entity";
import { getEntityReviews } from "../../api/reviews";
import { useFetch } from "../../hooks/useFetch";
import Pagination from "../pagination/Pagination";
import ReviewForm from "../reviewForm/ReviewForm";
import StarRating from "../starRating/StarRating";
import "./EntityReviews.css";

const PAGE_SIZE = 10;

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(new Date(iso));

type EntityReviewsProps = {
  entityType: MusicalEntityType;
  externalId: string;
};

const EntityReviews = ({ entityType, externalId }: EntityReviewsProps) => {
  const [page, setPage] = useState(1);
  const { data, loading, error, reload } = useFetch(
    useCallback(
      () =>
        getEntityReviews(entityType, externalId, { page, pageSize: PAGE_SIZE }),
      [entityType, externalId, page],
    ),
  );

  return (
    <section className="entity-reviews">
      <h2 className="entity-reviews-title">Reseñas</h2>
      <div className="entity-reviews-layout">
        <div className="entity-reviews-side">
          <h3 className="entity-reviews-side-title">Dejá tu reseña</h3>
          <ReviewForm
            entityType={entityType}
            externalId={externalId}
            onSubmitted={() => {
              setPage(1);
              reload();
            }}
          />
        </div>
        <div className="entity-reviews-main">
          {loading ? (
            <p className="entity-reviews-empty">Cargando reseñas...</p>
          ) : error ? (
            <p className="entity-reviews-empty">
              No se pudieron cargar las reseñas.
            </p>
          ) : !data || data.items.length === 0 ? (
            <p className="entity-reviews-empty">
              Todavía no hay reseñas para esta entidad. ¡Sé el primero!
            </p>
          ) : (
            <>
              <div className="entity-reviews-list">
                {data.items.map((review) => {
                  const initial = review.user.nickname.charAt(0).toUpperCase();

                  return (
                    <article className="entity-review-item" key={review.id}>
                      <span className="entity-review-avatar" aria-hidden="true">
                        {initial}
                      </span>
                      <div className="entity-review-body">
                        <div className="entity-review-header">
                          <span className="entity-review-author">
                            {review.user.nickname}
                          </span>
                          <StarRating value={review.value} readOnly size="sm" />
                        </div>
                        <p className="entity-review-text">{review.content}</p>
                        <span className="entity-review-date">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
              <Pagination
                currentPage={page}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default EntityReviews;
