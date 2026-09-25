import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { getAlbumDetail } from "../../api/musical-entity";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import SongList from "../../components/songList/SongList";
import { entityPath } from "../../utils/routes";
import { formatCount, formatDuration } from "../../utils/format";
import { useFetch } from "../../hooks/useFetch";
import { FaCompactDisc, FaStar } from "react-icons/fa";
import "./AlbumDetail.css";

const AlbumDetail = () => {
  const { id = "" } = useParams();

  const { data: album, loading, error } = useFetch(
    useCallback(() => getAlbumDetail(id), [id]),
  );

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
            No encontramos un álbum con ese id, o el servicio no está
            disponible en este momento.
          </p>
          <Link to="/" className="app-btn app-btn-primary album-not-found-cta">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

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
            <Link
              to={entityPath("artist", album.artist.id)}
              className="link album-hero-artist"
            >
              {album.artist.name}
            </Link>
            <div className="album-hero-meta">
              <span>
                {formatCount(album.songs.length, "canción", "canciones")}
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
