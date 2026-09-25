import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAlbumDetail,
  getAlbumIdByTitle,
  type AlbumDetail as AlbumDetailData,
} from "../../services/album.service";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import SongList from "../../components/songList/SongList";
import { FaCompactDisc, FaStar } from "react-icons/fa";
import "./AlbumDetail.css";

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")} min`;
};

const AlbumDetail = () => {
  const { name: reference = "" } = useParams();

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
        <div className="album-not-found">
          <span className="album-not-found-icon" aria-hidden="true">
            <FaCompactDisc />
          </span>
          <h1 className="album-not-found-title">Álbum no encontrado</h1>
          <p className="album-not-found-text">
            No encontramos un álbum con ese nombre, o el servicio no está
            disponible en este momento.
          </p>
          <Link to="/" className="app-btn app-btn-primary album-not-found-cta">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const artistRoute = album.artist.id
    ? `/artist/${album.artist.id}`
    : `/artist/${encodeURIComponent(album.artist.name)}`;

  return (
    <div className="app-container album-detail">
      <div className="album-detail-top">
        <header className="album-hero">
          <div className="album-hero-media">
            <img
              src={album.cover_big}
              alt={`Portada de ${album.title}`}
              className="album-hero-img"
            />
            <div className="album-hero-overlay">
              <h1>{album.title}</h1>
              <span
                className={`album-rating${
                  album.averageRating === null ||
                  album.averageRating === undefined
                    ? " album-rating-missing"
                    : ""
                }`}
              >
                {album.averageRating === null ||
                album.averageRating === undefined ? (
                  "Sin puntaje"
                ) : (
                  <>
                    {album.averageRating.toFixed(1)}
                    <FaStar className="album-rating-star" aria-hidden="true" />
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="album-hero-info">
            <Link to={artistRoute} className="artist-link album-hero-artist">
              {album.artist.name}
            </Link>
            <div className="album-hero-meta">
              <span>
                {album.songs.length} canción
                {album.songs.length === 1 ? "" : "es"}
              </span>
              <span className="album-facts-dot">•</span>
              <span>{formatDuration(album.duration)}</span>
              {album.release_date && (
                <>
                  <span className="album-facts-dot">•</span>
                  <span>{album.release_date.slice(0, 4)}</span>
                </>
              )}
            </div>
          </div>
        </header>

        <section className="album-songs-section">
          <SongList
            title="Canciones del álbum"
            showRank={false}
            songs={album.songs.map((song) => ({
              externalId: song.externalId,
              title: song.title,
              subtitle: formatDuration(song.duration),
              cover: album.cover_medium,
              averageRating: song.averageRating,
            }))}
          />
        </section>
      </div>

      <EntityReviews entityType="album" externalId={album.externalId} />
    </div>
  );
};

export default AlbumDetail;
