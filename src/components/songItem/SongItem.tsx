import { Link } from "react-router-dom";
import "./SongItem.css";

type SongItemProps = {
  id: number;
  title: string;
  artist: string;
  album: string;
  score: number | null;
  duration: number;
  imageUrl: string;
  plays: number;
  onPlay: () => void;
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
  plays,
  onPlay,
}: SongItemProps) => {
  return (
    <div className="song-card">
      <img
        src={imageUrl}
        alt={`Portada de ${title}`}
        className="song-card-img"
      />
      <div className="song-card-body">
        <h5 className="song-card-title">
          <Link to={`/song/${id}`} className="song-title-link">
            {title}
          </Link>
        </h5>
        <div className="song-card-subtitle">
          <Link
            to={`/artist/${encodeURIComponent(artist)}`}
            className="artist-link"
          >
            {artist}
          </Link>{" "}
          ·{" "}
          <Link
            to={`/album/${encodeURIComponent(album)}`}
            className="artist-link"
          >
            {album}
          </Link>
        </div>
        <div className="song-card-score">
          {score === null ? "Sin puntaje" : `${score.toFixed(1)} / 5`}
        </div>
        <p className="song-card-duration">{formatDuration(duration)}</p>
        <p className="song-plays">
          {plays.toLocaleString("es-AR")} reproducciones
        </p>
        <button
          type="button"
          className="app-btn app-btn-primary song-card-play"
          onClick={onPlay}
        >
          Reproducir
        </button>
      </div>
    </div>
  );
};

export default SongItem;