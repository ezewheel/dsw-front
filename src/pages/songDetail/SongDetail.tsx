import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./detail.css";

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  imageUrl: string;
  plays: number;
};

type Comment = {
  rating: number;
  text: string;
};

type SongDetailProps = {
  songs: Song[];
  comments: Record<number, Comment[]>;
  scores: Record<number, number | null>;
  addComment: (songId: number, comment: Comment) => void;
  addPlay: (songId: number) => void;
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")} min`;
};

const StarSelector = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-selector">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          className={n <= (hover || value) ? "star star-on" : "star"}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} estrella${n > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const SongDetail = ({
  songs,
  comments,
  scores,
  addComment,
  addPlay,
}: SongDetailProps) => {
  const { id } = useParams();
  const song = songs.find((s) => s.id === Number(id));

  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [validated, setValidated] = useState(false);

  if (!song) {
    return (
      <div className="app-container song-detail">
        <p>Canción no encontrada.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const songComments = comments[song.id] ?? [];
  const averageRating =
    songComments.length === 0
      ? null
      : songComments.reduce((acc, c) => acc + c.rating, 0) /
        songComments.length;

  const sameArtistSongs = songs.filter(
    (s) => s.artist === song.artist && s.id !== song.id,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating > 0 && text.trim() !== "") {
      addComment(song.id, { rating, text: text.trim() });
      setRating(0);
      setText("");
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <div className="app-container song-detail">
      <div className="song-detail-card">
        <div className="song-detail-cover">
          <img src={song.imageUrl} alt={`Portada de ${song.title}`} />
        </div>
        <div className="song-detail-info">
          <h1 className="song-detail-title">{song.title}</h1>
          <div className="song-detail-artist">
            <Link
              to={`/artist/${encodeURIComponent(song.artist)}`}
              className="artist-link"
            >
              {song.artist}
            </Link>
          </div>
          <div className="song-detail-meta">
            <span>
              Álbum:{" "}
              <Link
                to={`/album/${encodeURIComponent(song.album)}`}
                className="artist-link"
              >
                {song.album}
              </Link>
            </span>
            <span>Duración: {formatDuration(song.duration)}</span>
            <span>
              {song.plays.toLocaleString("es-AR")} reproducciones
            </span>
          </div>
          <div className="song-detail-rating">
            <div className="rating-average">
              {averageRating === null ? (
                "Sin puntaje"
              ) : (
                <>
                  <span className="rating-average-stars">
                    {averageRating.toFixed(1)}
                  </span>{" "}
                  / 5 · {songComments.length} comentario
                  {songComments.length === 1 ? "" : "s"}
                </>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn-play"
            aria-label="Reproducir"
            onClick={() => addPlay(song.id)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="22"
              height="22"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="references-wrapper">
        <section className="comments-section">
          <h3>Comentarios y valoración</h3>
          <form
            noValidate
            onSubmit={handleSubmit}
            className={`comment-form${validated ? " was-validated" : ""}`}
          >
            <div className="form-field">
              <label className="form-label">Tu puntuación</label>
              <StarSelector value={rating} onChange={setRating} />
              {validated && rating === 0 && (
                <p className="form-feedback form-feedback-visible">
                  Elegí una puntuación.
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="comment-text">
                Tu opinión
              </label>
              <textarea
                id="comment-text"
                rows={4}
                className="form-input"
                placeholder="¿Qué opinás de esta canción?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
              <p className="form-feedback">Escribí tu opinión.</p>
            </div>

            <button type="submit" className="app-btn app-btn-primary">
              Publicar comentario
            </button>
          </form>

          <div className="comments-list">
            {songComments.length === 0 ? (
              <p className="comments-empty">
                Todavía no hay comentarios para esta canción. ¡Sé el primero!
              </p>
            ) : (
              songComments.map((comment, i) => (
                <div className="comment-card" key={i}>
                  <div className="comment-header">
                    <span className="comment-stars">
                      {"★".repeat(comment.rating)}
                      <span className="comment-stars-empty">
                        {"★".repeat(5 - comment.rating)}
                      </span>
                    </span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="recommendations">
          <h3>Más de {song.artist}</h3>
          {sameArtistSongs.length === 0 ? (
            <p className="comments-empty">
              No hay más canciones de este artista.
            </p>
          ) : (
            sameArtistSongs.map((rec) => (
              <Link
                to={`/song/${rec.id}`}
                className="recommendation-card"
                key={rec.id}
              >
                <img src={rec.imageUrl} alt={`Portada de ${rec.title}`} />
                <div className="recommendation-info">
                  <div className="recommendation-title">{rec.title}</div>
                  <div className="recommendation-meta">
                    {scores[rec.id] === null || scores[rec.id] === undefined
                      ? "Sin puntaje"
                      : `${(scores[rec.id] as number).toFixed(1)} / 5`}
                  </div>
                </div>
              </Link>
            ))
          )}
        </aside>
      </div>
    </div>
  );
};

export default SongDetail;