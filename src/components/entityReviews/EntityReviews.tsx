import { useEffect, useState } from "react";
import type { SearchApiType } from "../../services/search.service";
import {
  getEntityReviews,
  type EntityReview,
} from "../../services/reviews.service";
import Pagination from "../pagination/Pagination";
import ReviewForm from "../reviewForm/ReviewForm";
import StarRating from "../starRating/StarRating";
import "./EntityReviews.css";

const PAGE_SIZE = 10;

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(new Date(iso));

type EntityReviewsProps = {
  entityType: SearchApiType;
  externalId: string;
};

const EntityReviews = ({ entityType, externalId }: EntityReviewsProps) => {
  const [reviews, setReviews] = useState<EntityReview[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const safePage = Math.min(page, Math.max(1, totalPages));

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(false);
      setReviews(null);

      try {
        const result = await getEntityReviews(entityType, externalId, {
          page: safePage,
          pageSize: PAGE_SIZE,
        });
        if (!active) return;
        setReviews(result.items);
        setTotalPages(result.totalPages);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [entityType, externalId, safePage, refreshKey]);

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
              setRefreshKey((key) => key + 1);
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
          ) : reviews === null || reviews.length === 0 ? (
            <p className="entity-reviews-empty">
              Todavía no hay reseñas para esta entidad. ¡Sé el primero!
            </p>
          ) : (
            <>
              <div className="entity-reviews-list">
                {reviews.map((review) => {
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
                currentPage={safePage}
                totalPages={totalPages}
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
