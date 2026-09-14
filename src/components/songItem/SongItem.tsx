import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    <Card className="song-card">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>
          <Link to={`/song/${id}`} className="song-title-link">
            {title}
          </Link>
        </Card.Title>
        <Card.Subtitle>
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
        </Card.Subtitle>
        <div>{score === null ? "Sin puntaje" : `${score.toFixed(1)} / 5`}</div>
        <p>{formatDuration(duration)}</p>
        <p className="song-plays">
          {plays.toLocaleString("es-AR")} reproducciones
        </p>
        <Button variant="primary" className="mt-auto" onClick={onPlay}>
          Reproducir
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SongItem;