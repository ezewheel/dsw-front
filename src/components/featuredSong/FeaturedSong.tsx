import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type FeaturedSongProps = {
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

const FeaturedSong = ({
  id,
  title,
  artist,
  album,
  score,
  duration,
  imageUrl,
  plays,
  onPlay,
}: FeaturedSongProps) => {
  return (
    <div className="featured-song">
      <img
        className="featured-song-image"
        src={imageUrl}
        alt={`Portada de ${title}`}
      />
      <div className="featured-song-overlay">
        <h2 className="featured-song-title">
          <Link to={`/song/${id}`} className="song-title-link">
            {title}
          </Link>
        </h2>
        <div className="featured-song-artist">
          <Link
            to={`/artist/${encodeURIComponent(artist)}`}
            className="artist-link"
          >
            {artist}
          </Link>
        </div>
        <div className="featured-song-subtitle">
          Álbum:{" "}
          <Link
            to={`/album/${encodeURIComponent(album)}`}
            className="artist-link"
          >
            {album}
          </Link>{" "}
          • {formatDuration(duration)}
        </div>
        <div className="featured-song-meta">
          <span>
            {score === null ? "Sin puntaje" : `${score.toFixed(1)} / 5`}
          </span>
          <span className="featured-song-dot">•</span>
          <span>
            {plays.toLocaleString("es-AR")} reproducciones
          </span>
        </div>
        <Button variant="primary" size="sm" onClick={onPlay}>
          Reproducir
        </Button>
      </div>
    </div>
  );
};

export default FeaturedSong;