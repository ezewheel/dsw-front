import { Link } from "react-router-dom";
import "./SongItem.css";

type SongItemProps = {
  id: string;
  title: string;
  artist: string;
  album: string;
  score: number | null;
  duration: number;
  imageUrl: string;
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")} min`;
};

const SongItem = ({
  id,
  title,
  artist,
  album,
  score,
  duration,
  imageUrl,
}: SongItemProps) => {
  return (
    <div className="song-card">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`Portada de ${title}`}
          className="song-card-img"
        />
      ) : (
        <div className="song-card-img song-card-img-placeholder" aria-hidden="true">
          ♪
        </div>
      )}
      <div className="song-card-body">
        <h5 className="song-card-title">
          <Link to={`/song/${id}`} className="song-title-link">
            {title}
          </Link>
        </h5>
        {artist || album ? (
          <div className="song-card-subtitle">
            {artist ? (
              <Link
                to={`/artist/${encodeURIComponent(artist)}`}
                className="artist-link"
              >
                {artist}
              </Link>
            ) : null}{" "}
            {artist && album ? "·" : null}{" "}
            {album ? (
              <Link
                to={`/album/${encodeURIComponent(album)}`}
                className="artist-link"
              >
                {album}
              </Link>
            ) : null}
          </div>
        ) : null}
        <div className="song-card-score">
          {score === null ? "Sin puntaje" : `${score.toFixed(1)} / 5`}
        </div>
        <p className="song-card-duration">{formatDuration(duration)}</p>
      </div>
    </div>
  );
};

export default SongItem;