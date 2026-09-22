import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getLatestReviews,
  type LatestReview,
} from "../../services/reviews.service";
import type { SearchApiType } from "../../services/search.service";
import Reveal from "../reveal/Reveal";
import "./ReviewsSection.css";

const TYPE_LABELS: Record<SearchApiType, string> = {
  track: "canción",
  album: "álbum",
  artist: "artista",
};

const LATEST_REVIEWS_LIMIT = 5;

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(new Date(iso));

const Stars = ({ value }: { value: number }) => (
  <span className="stars" aria-label={`${value} de 5 estrellas`}>
    {"★".repeat(value)}
    <span className="stars-empty">{"★".repeat(5 - value)}</span>
  </span>
);

const entityHref = (entity: LatestReview["entity"]): string | null => {
  if (entity.type === "track") return `/song/${entity.externalId}`;
  if (!entity.title) return null;
  return entity.type === "artist"
    ? `/artist/${encodeURIComponent(entity.title)}`
    : `/album/${encodeURIComponent(entity.title)}`;
};

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<LatestReview[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(false);
      setReviews(null);

      try {
        const data = await getLatestReviews(LATEST_REVIEWS_LIMIT);
        if (!active) return;
        setReviews(data);
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
  }, []);

  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Reseñas que capaz te interesen</h2>

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
            const href = entityHref(review.entity);
            const title = review.entity.title ?? "Contenido no disponible";
            const content =
              href !== null ? (
                <Link to={href} className="review-song-link">
                  {title}
                </Link>
              ) : (
                <span className="review-song">{title}</span>
              );

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
                      {content}
                      <Stars value={Math.round(review.value)} />
                    </div>
                    <div className="review-author">
                      {review.user.nickname} · {TYPE_LABELS[review.entity.type]}{" "}
                      · {formatDate(review.createdAt)}
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
