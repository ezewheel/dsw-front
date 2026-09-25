import { Link } from "react-router-dom";
import type { ReviewedSong } from "../../../api/reviews";
import { entityPath } from "../../../utils/routes";
import { formatDuration } from "../../../utils/format";
import AverageRating from "../../averageRating/AverageRating";
import "./SongItem.css";

const SongItem = ({ song }: { song: ReviewedSong }) => {
  const title = song.title ?? "Título no disponible";
  const hasSubtitle = song.artistId !== null || song.albumId !== null;

  return (
    <div className="song-card">
      <div className="song-card-img-wrapper">
        {song.cover ? (
          <img
            src={song.cover}
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
          <Link to={entityPath("track", song.externalId)} className="link">
            {title}
          </Link>
        </h5>

        {hasSubtitle && (
          <div className="song-card-subtitle">
            {song.artistId !== null && (
              <Link to={entityPath("artist", song.artistId)} className="link">
                {song.artist}
              </Link>
            )}
            {song.artistId !== null && song.albumId !== null && (
              <span className="song-card-dot"> · </span>
            )}
            {song.albumId !== null && (
              <Link to={entityPath("album", song.albumId)} className="link">
                {song.album}
              </Link>
            )}
          </div>
        )}

        <AverageRating value={song.averageRating} />

        <p className="song-card-duration">
          {formatDuration(song.duration ?? 0)}
        </p>
      </div>
    </div>
  );
};

export default SongItem;
