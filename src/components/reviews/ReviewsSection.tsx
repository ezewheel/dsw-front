import { Link } from "react-router-dom";
import { getLatestReviews } from "../../api/reviews";
import { ENTITY_TYPE_LABELS } from "../../api/musical-entity";
import Reveal from "../reveal/Reveal";
import StarRating from "../starRating/StarRating";
import { entityPath } from "../../utils/routes";
import { useFetch } from "../../hooks/useFetch";
import "./ReviewsSection.css";

const LATEST_REVIEWS_LIMIT = 5;

const loadLatestReviews = () => getLatestReviews(LATEST_REVIEWS_LIMIT);

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(new Date(iso));

const ReviewsSection = () => {
  const { data: reviews, loading, error } = useFetch(loadLatestReviews);

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Últimas reseñas</h2>

      {loading && <p className="reviews-empty">Cargando reseñas...</p>}

      {!loading && error && (
        <p className="reviews-empty">No se pudieron cargar las reseñas.</p>
      )}

      {!loading && !error && (reviews === null || reviews.length === 0) && (
        <p className="reviews-empty">Todavía no hay reseñas. ¡Sé el primero!</p>
      )}

      {!loading && !error && reviews !== null && reviews.length > 0 && (
        <div className="reviews-list">
          {reviews.map((review) => {
            const title = review.entity.title ?? "Contenido no disponible";

            return (
              <Reveal key={review.id}>
                <article className="review-item">
                  {review.entity.cover ? (
                    <img
                      className="review-cover"
                      src={review.entity.cover}
                      alt={`Portada de ${title}`}
                    />
                  ) : (
                    <div
                      className="review-cover review-cover-placeholder"
                      aria-hidden="true"
                    >
                      ♪
                    </div>
                  )}
                  <div className="review-content">
                    <div className="review-header">
                      <Link
                        to={entityPath(
                          review.entity.type,
                          review.entity.externalId,
                        )}
                        className="review-song-link"
                      >
                        {title}
                      </Link>
                      <StarRating value={review.value} readOnly size="sm" />
                    </div>
                    <div className="review-author">
                      {review.user.nickname} ·{" "}
                      {ENTITY_TYPE_LABELS[review.entity.type]} ·{" "}
                      {formatDate(review.createdAt)}
                    </div>
                    <p className="review-text">{review.content}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
