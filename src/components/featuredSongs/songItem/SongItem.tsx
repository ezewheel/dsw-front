import { Link } from "react-router-dom";
import { entityPath } from "../../../utils/routes";
import "./SongItem.css";

type SongItemProps = {
  id: string;
  title: string;
  artist: string;
  artistId: number | null;
  album: string;
  albumId: number | null;
  score: number | null;
  duration: number;
  imageUrl: string;
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} min`;
};

const StarRating = ({ score }: { score: number | null }) => {
  if (score === null) {
    return (
      <span className="song-card-score song-card-score-empty">Sin puntaje</span>
    );
  }

  return (
    <div className="song-card-score">
      <span className="song-card-score-value">{score.toFixed(2)}</span>
      <span className="song-card-score-star" aria-hidden="true">
        ★
      </span>
    </div>
  );
};

const SongItem = ({
  id,
  title,
  artist,
  artistId,
  album,
  albumId,
  score,
  duration,
  imageUrl,
}: SongItemProps) => {
  const hasSubtitle = artistId !== null || albumId !== null;

  return (
    <div className="song-card">
      <div className="song-card-img-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Portada de ${title}`}
            className="song-card-img"
          />
        ) : (
          <div
            className="song-card-img song-card-img-placeholder"
            aria-hidden="true"
          >
            ♪
          </div>
        )}
      </div>

      <div className="song-card-body">
        <h5 className="song-card-title">
          <Link to={entityPath("track", id)} className="song-title-link">
            {title}
          </Link>
        </h5>

        {hasSubtitle && (
          <div className="song-card-subtitle">
            {artistId !== null && (
              <Link to={entityPath("artist", artistId)} className="artist-link">
                {artist}
              </Link>
            )}
            {artistId !== null && albumId !== null && (
              <span className="song-card-dot"> · </span>
            )}
            {albumId !== null && (
              <Link to={entityPath("album", albumId)} className="artist-link">
                {album}
              </Link>
            )}
          </div>
        )}

        <StarRating score={score} />

        <p className="song-card-duration">{formatDuration(duration)}</p>
      </div>
    </div>
  );
};

export default SongItem;
