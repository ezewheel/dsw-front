import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AlbumDetail.css";
import "../songDetail/detail.css";

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  imageUrl: string;
};

type Comment = {
  rating: number;
  text: string;
};

type AlbumDetailProps = {
  songs: Song[];
  scores: Record<number, number | null>;
  albumComments: Record<string, Comment[]>;
  addAlbumComment: (albumName: string, comment: Comment) => void;
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

const AlbumDetail = ({
  songs,
  scores,
  albumComments,
  addAlbumComment,
}: AlbumDetailProps) => {
  const { name } = useParams();
  const album = decodeURIComponent(name ?? "");
  const albumSongs = songs.filter((s) => s.album === album);

  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [validated, setValidated] = useState(false);

  if (albumSongs.length === 0) {
    return (
      <div className="app-container album-detail">
        <p>Álbum no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const artist = albumSongs[0].artist;
  const albumScoreValues = albumSongs
    .map((s) => scores[s.id])
    .filter((s): s is number => s !== null && s !== undefined);
  const albumScore =
    albumScoreValues.length > 0
      ? albumScoreValues.reduce((acc, s) => acc + s, 0) /
        albumScoreValues.length
      : null;

  const comments = albumComments[album] ?? [];
  const displayedRating =
    comments.length > 0
      ? comments.reduce((acc, c) => acc + c.rating, 0) / comments.length
      : albumScore;

  const totalDuration = albumSongs.reduce((acc, s) => acc + s.duration, 0);

  const otherAlbums = [
    ...new Set(
      songs
        .filter((s) => s.artist === artist && s.album !== album)
        .map((s) => s.album),
    ),
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating > 0 && text.trim() !== "") {
      addAlbumComment(album, { rating, text: text.trim() });
      setRating(0);
      setText("");
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <div className="app-container album-detail">
      <Link to="/" className="song-detail-back">
        ← Volver
      </Link>
      <div className="song-detail-card">
        <div className="song-detail-cover">
          <img
            src={albumSongs[0].imageUrl}
            alt={`Portada del álbum ${album}`}
          />
        </div>
        <div className="song-detail-info">
          <h1 className="song-detail-title">{album}</h1>
          <div className="song-detail-artist">
            <Link
              to={`/artist/${encodeURIComponent(artist)}`}
              className="artist-link"
            >
              {artist}
            </Link>
          </div>
          <div className="song-detail-meta">
            <span>
              {albumSongs.length} canción
              {albumSongs.length === 1 ? "" : "es"}
            </span>
            <span>Duración total: {formatDuration(totalDuration)}</span>
          </div>
          <div className="song-detail-rating">
            <div className="rating-average">
              {displayedRating === null ? (
                "Sin puntaje"
              ) : (
                <>
                  <span className="rating-average-stars">
                    {displayedRating.toFixed(1)}
                  </span>{" "}
                  / 5 · {comments.length} comentario
                  {comments.length === 1 ? "" : "s"}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="album-songs-section">
        <h2>Canciones del álbum</h2>
        <div className="album-song-list">
          {albumSongs.map((song) => (
            <Link
              to={`/song/${song.id}`}
              className="album-song-row"
              key={song.id}
            >
              <img src={song.imageUrl} alt={`Portada de ${song.title}`} />
              <div className="album-song-row-info">
                <div className="album-song-row-title">{song.title}</div>
                <div className="recommendation-meta">
                  {scores[song.id] === null || scores[song.id] === undefined
                    ? "Sin puntaje"
                    : `${(scores[song.id] as number).toFixed(1)} / 5`}{" "}
                  · {formatDuration(song.duration)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
              <label className="form-label" htmlFor="album-comment-text">
                Tu opinión
              </label>
              <textarea
                id="album-comment-text"
                rows={4}
                className="form-input"
                placeholder="¿Qué opinás de este álbum?"
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
            {comments.length === 0 ? (
              <p className="comments-empty">
                Todavía no hay comentarios para este álbum. ¡Sé el primero!
              </p>
            ) : (
              comments.map((comment, i) => (
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
          <h3>Otros álbumes de {artist}</h3>
          {otherAlbums.length === 0 ? (
            <p className="comments-empty">
              No hay más álbumes de este artista.
            </p>
          ) : (
            otherAlbums.map((albumName) => {
              const cover =
                songs.find((s) => s.album === albumName)?.imageUrl ?? "";
              const count = songs.filter((s) => s.album === albumName).length;
              return (
                <Link
                  to={`/album/${encodeURIComponent(albumName)}`}
                  className="recommendation-card"
                  key={albumName}
                >
                  <img src={cover} alt={`Portada de ${albumName}`} />
                  <div className="recommendation-info">
                    <div className="recommendation-title">{albumName}</div>
                    <div className="recommendation-meta">
                      {count} canción{count === 1 ? "" : "es"}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </aside>
      </div>
    </div>
  );
};

export default AlbumDetail;