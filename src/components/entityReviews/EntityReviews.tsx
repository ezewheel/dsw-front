import { useEffect, useState } from "react";
import type { SearchApiType } from "../../services/search.service";
import {
  getEntityReviews,
  type EntityReview,
} from "../../services/reviews.service";
import Pagination from "../pagination/Pagination";
import "./EntityReviews.css";

const PAGE_SIZE = 10;

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(new Date(iso));

const Stars = ({ value }: { value: number }) => (
  <span
    className="entity-reviews-stars"
    aria-label={`${value} de 5 estrellas`}
  >
    {"★".repeat(value)}
    <span className="entity-reviews-stars-empty">{"★".repeat(5 - value)}</span>
  </span>
);

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
  }, [entityType, externalId, safePage]);

  if (loading) {
    return (
      <section className="entity-reviews">
        <h2 className="entity-reviews-title">Reseñas</h2>
        <p className="entity-reviews-empty">Cargando reseñas...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="entity-reviews">
        <h2 className="entity-reviews-title">Reseñas</h2>
        <p className="entity-reviews-empty">No se pudieron cargar las reseñas.</p>
      </section>
    );
  }

  return (
    <section className="entity-reviews">
      <h2 className="entity-reviews-title">Reseñas</h2>
      {reviews === null || reviews.length === 0 ? (
        <p className="entity-reviews-empty">
          Todavía no hay reseñas para esta entidad. ¡Sé el primero!
        </p>
      ) : (
        <>
          <div className="entity-reviews-list">
            {reviews.map((review) => (
              <article className="entity-review-card" key={review.id}>
                <div className="entity-review-header">
                  <span className="entity-review-author">
                    {review.user.nickname}
                  </span>
                  <Stars value={review.value} />
                </div>
                <p className="entity-review-text">{review.content}</p>
                <div className="entity-review-date">
                  {formatDate(review.createdAt)}
                </div>
              </article>
            ))}
          </div>
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
};

export default EntityReviews;