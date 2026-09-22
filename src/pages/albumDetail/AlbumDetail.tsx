import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAlbumDetail,
  getAlbumIdByTitle,
  type AlbumDetail as AlbumDetailData,
} from "../../services/album.service";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import "./AlbumDetail.css";

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")} min`;
};

const formatRating = (value: number | null): string =>
  value === null || value === undefined
    ? "Sin puntaje"
    : `${value.toFixed(1)} / 5`;

const AlbumDetail = () => {
  const { name } = useParams();
  const reference = decodeURIComponent(name ?? "");

  const [album, setAlbum] = useState<AlbumDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(false);
      setAlbum(null);

      try {
        const trimmed = reference.trim();
        if (trimmed === "") {
          throw new Error("Referencia vacía");
        }
        const id = /^\d+$/.test(trimmed)
          ? trimmed
          : await getAlbumIdByTitle(trimmed);
        if (id === null) {
          throw new Error("Álbum no encontrado");
        }
        const detail = await getAlbumDetail(id);
        if (active) setAlbum(detail);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [reference]);

  if (loading) {
    return (
      <div className="app-container album-detail">
        <p>Cargando álbum...</p>
      </div>
    );
  }

  if (error || album === null) {
    return (
      <div className="app-container album-detail">
        <p>Álbum no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const artistRoute = album.artist.id
    ? `/artist/${album.artist.id}`
    : `/artist/${encodeURIComponent(album.artist.name)}`;

  return (
    <div className="app-container album-detail">
      <header className="album-hero">
        <div className="album-hero-media">
          <img
            src={album.cover_big}
            alt={`Portada de ${album.title}`}
            className="album-image"
          />
          <div className="album-info-overlay">
            <span className="album-rating">
              {formatRating(album.averageRating)}
            </span>
            <h1>{album.title}</h1>
            <Link to={artistRoute} className="artist-link album-artist">
              {album.artist.name}
            </Link>
            <div className="album-meta">
              <span>
                {album.songs.length} canción
                {album.songs.length === 1 ? "" : "es"}
              </span>
              <span className="album-facts-dot">•</span>
              <span>{formatDuration(album.duration)}</span>
            </div>
          </div>
        </div>
      </header>

      <section className="album-songs-section">
        <h2>Canciones del álbum</h2>
        <div className="album-song-list">
          {album.songs.map((song) => (
            <Link
              to={`/song/${song.externalId}`}
              className="album-song-row"
              key={song.externalId}
            >
              <img
                src={album.cover_medium}
                alt={`Portada de ${song.title}`}
              />
              <div className="album-song-row-info">
                <div className="album-song-row-title">{song.title}</div>
                <div className="recommendation-meta">
                  {formatRating(song.averageRating)} ·{" "}
                  {formatDuration(song.duration)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <EntityReviews entityType="album" externalId={album.externalId} />
    </div>
  );
};

export default AlbumDetail;