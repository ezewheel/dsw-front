import { Link } from "react-router-dom";
import { getLatestReviews } from "../../../../api/reviews";
import { ENTITY_TYPE_LABELS } from "../../../../api/musical-entity";
import Reveal from "../reveal/Reveal";
import StarRating from "../../../../components/starRating/StarRating";
import { entityPath } from "../../../../utils/routes";
import { formatDate } from "../../../../utils/format";
import { useFetch } from "../../../../hooks/useFetch";
import "./LatestReviews.css";

const LATEST_REVIEWS_LIMIT = 5;

const loadLatestReviews = () => getLatestReviews(LATEST_REVIEWS_LIMIT);

const LatestReviews = () => {
  const { data: reviews, loading, error } = useFetch(loadLatestReviews);

  return (
    <section className="latest-reviews">
      <h2 className="latest-reviews-title">Últimas reseñas</h2>

      {loading && <p className="status-message">Cargando reseñas...</p>}

      {!loading && error && (
        <p className="status-message">No se pudieron cargar las reseñas.</p>
      )}

      {!loading && !error && (reviews === null || reviews.length === 0) && (
        <p className="status-message">Todavía no hay reseñas. ¡Sé el primero!</p>
      )}

      {!loading && !error && reviews !== null && reviews.length > 0 && (
        <div className="latest-reviews-list">
          {reviews.map((review, i) => {
            const title = review.entity.title ?? "Contenido no disponible";

            return (
              <Reveal key={review.id} delay={i * 100}>
                <article className="latest-reviews-item">
                  {review.entity.cover ? (
                    <img
                      className="latest-reviews-cover"
                      src={review.entity.cover}
                      alt={`Portada de ${title}`}
                    />
                  ) : (
                    <div
                      className="latest-reviews-cover latest-reviews-cover-placeholder"
                      aria-hidden="true"
                    >
                      ♪
                    </div>
                  )}
                  <div className="latest-reviews-content">
                    <div className="latest-reviews-header">
                      <Link
                        to={entityPath(
                          review.entity.type,
                          review.entity.externalId,
                        )}
                        className="latest-reviews-track-link"
                      >
                        {title}
                      </Link>
                      <StarRating value={review.value} readOnly size="sm" />
                    </div>
                    <div className="latest-reviews-author">
                      {review.user.nickname} ·{" "}
                      {ENTITY_TYPE_LABELS[review.entity.type]} ·{" "}
                      {formatDate(review.updatedAt)}
                    </div>
                    <p className="latest-reviews-text">{review.content}</p>
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

export default LatestReviews;
