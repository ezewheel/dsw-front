import { Link } from "react-router-dom";
import { entityPath } from "../../../utils/routes";
import { formatDuration } from "../../../utils/format";
import AverageRating from "../../averageRating/AverageRating";
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
          <Link to={entityPath("track", id)} className="link">
            {title}
          </Link>
        </h5>

        {hasSubtitle && (
          <div className="song-card-subtitle">
            {artistId !== null && (
              <Link to={entityPath("artist", artistId)} className="link">
                {artist}
              </Link>
            )}
            {artistId !== null && albumId !== null && (
              <span className="song-card-dot"> · </span>
            )}
            {albumId !== null && (
              <Link to={entityPath("album", albumId)} className="link">
                {album}
              </Link>
            )}
          </div>
        )}

        <AverageRating value={score} />

        <p className="song-card-duration">{formatDuration(duration)}</p>
      </div>
    </div>
  );
};

export default SongItem;
