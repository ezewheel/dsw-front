import { Link } from "react-router-dom";
import type { ReviewedTrack } from "../../../../api/reviews";
import { entityPath } from "../../../../utils/routes";
import { formatDuration } from "../../../../utils/format";
import AverageRating from "../../../../components/averageRating/AverageRating";
import "./TrackCard.css";

const TrackCard = ({ track }: { track: ReviewedTrack }) => {
  const title = track.title ?? "Título no disponible";
  const hasSubtitle = track.artistId !== null || track.albumId !== null;

  return (
    <div className="track-card">
      <div className="track-card-img-wrapper">
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
      </div>

      <div className="track-card-body">
        <h5 className="track-card-title">
          <Link to={entityPath("track", track.externalId)} className="link">
            {title}
          </Link>
        </h5>

        {hasSubtitle && (
          <div className="track-card-subtitle">
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
          </div>
        )}

        <AverageRating value={track.averageRating} />

        <p className="track-card-duration">
          {formatDuration(track.duration ?? 0)}
        </p>
      </div>
    </div>
  );
};

export default TrackCard;
