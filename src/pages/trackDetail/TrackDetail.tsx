import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAlbumDetail,
  getTrackDetail,
  type AlbumSong,
} from "../../api/musical-entity";
import SameAlbumTracksSection from "../../components/sameAlbumTracks/SameAlbumTracksSection";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import AverageRating from "../../components/averageRating/AverageRating";
import { entityPath } from "../../utils/routes";
import { formatCount, formatDuration } from "../../utils/format";
import { useFetch } from "../../hooks/useFetch";
import {
  FaMusic,
  FaMicrophone,
  FaCommentDots,
  FaClock,
  FaCompactDisc,
} from "react-icons/fa";
import "./TrackDetail.css";

const loadTrackPage = async (id: string) => {
  const track = await getTrackDetail(id);
  const albumSongs = await getAlbumDetail(String(track.album.id))
    .then((album) => album.songs)
    .catch((): AlbumSong[] => []);
  return { track, albumSongs };
};

const TrackDetail = () => {
  const { id = "" } = useParams();

  const { data, loading, error } = useFetch(
    useCallback(() => loadTrackPage(id), [id]),
  );

  if (loading) {
    return (
      <div className="app-container track-detail loading-message">
        <p>Cargando canción...</p>
      </div>
    );
  }

  if (error || !data) {
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

  const { track, albumSongs } = data;

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
              <AverageRating value={track.averageRating} size="lg" />
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
                {formatCount(
                  track.ratingsCount,
                  "calificación",
                  "calificaciones",
                )}
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