import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getTrackDetail,
  type TrackDetail as TrackDetailData,
} from "../../services/track.service";
import { getAlbumDetail, type AlbumSong } from "../../services/album.service";
import SameAlbumTracksSection from "../../components/sameAlbumTracks/SameAlbumTracksSection";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import { entityPath } from "../../utils/routes";
import {
  FaStar,
  FaMusic,
  FaMicrophone,
  FaCommentDots,
  FaClock,
  FaCompactDisc,
} from "react-icons/fa";
import "./TrackDetail.css";

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")} min`;
};

const TrackDetail = () => {
  const { id = "" } = useParams();

  const [track, setTrack] = useState<TrackDetailData | null>(null);
  const [albumSongs, setAlbumSongs] = useState<AlbumSong[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      setTrack(null);
      setAlbumSongs([]);

      try {
        const detail = await getTrackDetail(id);
        if (cancelled) return;
        setTrack(detail);

        try {
          const album = await getAlbumDetail(String(detail.album.id));
          if (cancelled) return;
          setAlbumSongs(album.songs);
        } catch {
          if (!cancelled) setAlbumSongs([]);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="app-container track-detail loading-message">
        <p>Cargando canción...</p>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="app-container track-detail">
        <div className="track-not-found">
          <span className="track-not-found-icon" aria-hidden="true">
            <FaMusic />
          </span>
          <h1 className="track-not-found-title">Canción no encontrada</h1>
          <p className="track-not-found-text">
            No encontramos una canción con ese id, o el servicio no está
            disponible en este momento.
          </p>
          <Link to="/" className="app-btn app-btn-primary track-not-found-cta">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container track-detail">
      <div className="track-detail-top">
        <div className="track-hero-column">
          <header className="track-hero">
            <img
              src={track.album.cover_big}
              alt={`Imagen de ${track.title}`}
              className="track-hero-img"
            />
            <div className="track-hero-overlay">
              <h1>{track.title}</h1>
              <span
                className={`track-rating${
                  track.averageRating === null ? " track-rating-missing" : ""
                }`}
              >
                {track.averageRating === null ? (
                  "Sin puntaje"
                ) : (
                  <>
                    {track.averageRating.toFixed(1)}
                    <FaStar className="track-rating-star" aria-hidden="true" />
                  </>
                )}
              </span>
            </div>
          </header>

          <div className="track-hero-meta">
            <div className="track-meta-item">
              <FaMicrophone
                className="track-meta-icon"
                aria-hidden="true"
              />
              <Link
                to={entityPath("artist", track.artist.id)}
                className="track-hero-link track-hero-artist"
                title={track.artist.name}
              >
                {track.artist.name}
              </Link>
            </div>
            <div className="track-meta-item">
              <FaClock className="track-meta-icon" aria-hidden="true" />
              <span className="track-hero-duration">
                {formatDuration(track.duration)}
              </span>
            </div>
            <div className="track-meta-item">
              <FaCompactDisc
                className="track-meta-icon"
                aria-hidden="true"
              />
              <Link
                to={entityPath("album", track.album.id)}
                className="track-hero-link track-hero-album"
                title={track.album.title}
              >
                {track.album.title}
              </Link>
            </div>
            <div className="track-meta-item">
              <FaCommentDots
                className="track-meta-icon"
                aria-hidden="true"
              />
              <span className="track-hero-ratings">
                {track.ratingsCount}{" "}
                {track.ratingsCount === 1 ? "calificación" : "calificaciones"}
              </span>
            </div>
          </div>
        </div>

        <SameAlbumTracksSection
          tracks={albumSongs}
          cover={track.album.cover_big}
        />
      </div>

      <EntityReviews entityType="track" externalId={track.externalId} />
    </div>
  );
};

export default TrackDetail;