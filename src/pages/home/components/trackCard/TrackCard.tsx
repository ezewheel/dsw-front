import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import type { ReviewedTrack } from "../../../../api/reviews";
import { entityPath } from "../../../../utils/routes";
import { formatDuration } from "../../../../utils/format";
import AverageRating from "../../../../components/averageRating/AverageRating";
import "./TrackCard.css";

const TrackCard = ({ track }: { track: ReviewedTrack }) => {
  const title = track.title ?? "Título no disponible";
  const hasSubtitle = track.artistId !== null || track.albumId !== null;
  const trackPath = entityPath("track", track.externalId);

  return (
    <article className="track-card">
      <Link to={trackPath} className="track-card-img-wrapper" tabIndex={-1}>
        {track.cover ? (
          <img
            src={track.cover}
            alt={`Portada de ${title}`}
            className="track-card-img"
          />
        ) : (
          <div
            className="track-card-img track-card-img-placeholder"
            aria-hidden="true"
          >
            ♪
          </div>
        )}
        <span className="track-card-rating">
          <AverageRating value={track.averageRating} size="sm" />
        </span>
      </Link>

      <div className="track-card-body">
        <h3 className="track-card-title">
          <Link to={trackPath} className="link">
            {title}
          </Link>
        </h3>

        {hasSubtitle && (
          <p className="track-card-subtitle">
            {track.artistId !== null && (
              <Link to={entityPath("artist", track.artistId)} className="link">
                {track.artist}
              </Link>
            )}
            {track.artistId !== null && track.albumId !== null && (
              <span className="track-card-dot"> · </span>
            )}
            {track.albumId !== null && (
              <Link to={entityPath("album", track.albumId)} className="link">
                {track.album}
              </Link>
            )}
          </p>
        )}

        <p className="track-card-duration">
          <FaClock aria-hidden="true" />
          {formatDuration(track.duration ?? 0)}
        </p>
      </div>
    </article>
  );
};

export const TrackCardSkeleton = () => (
  <div className="track-card track-card-skeleton" aria-hidden="true">
    <div className="track-card-img" />
    <div className="track-card-body">
      <span className="track-card-skeleton-line" />
      <span className="track-card-skeleton-line track-card-skeleton-line-short" />
      <span className="track-card-skeleton-line track-card-skeleton-line-thin" />
    </div>
  </div>
);

export default TrackCard;
