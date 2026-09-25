import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAlbumDetail,
  getTrackDetail,
  type AlbumTrack,
} from "../../api/musical-entity";
import SongList from "../../components/songList/SongList";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import DetailHero from "../../components/detailHero/DetailHero";
import NotFound from "../../components/notFound/NotFound";
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
import "../detail.css";
import "./TrackDetail.css";

const loadTrackPage = async (id: string) => {
  const track = await getTrackDetail(id);
  const albumTracks = await getAlbumDetail(String(track.album.id))
    .then((album) => album.tracks)
    .catch((): AlbumTrack[] => []);
  return { track, albumTracks };
};

const TrackDetail = () => {
  const { id = "" } = useParams();

  const { data, loading, error } = useFetch(
    useCallback(() => loadTrackPage(id), [id]),
  );

  if (loading) {
    return (
      <div className="app-container detail-page loading-message">
        <p>Cargando canción...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="app-container detail-page">
        <NotFound
          icon={<FaMusic />}
          title="Canción no encontrada"
          text="No encontramos una canción con ese id, o el servicio no está disponible en este momento."
        />
      </div>
    );
  }

  const { track, albumTracks } = data;

  return (
    <div className="app-container detail-page">
      <div className="detail-top">
        <DetailHero
          image={track.album.cover}
          title={track.title}
          rating={track.averageRating}
        >
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
        </DetailHero>

        <SongList
          title="Canciones del mismo álbum"
          songs={albumTracks.map((albumTrack) => ({
            externalId: albumTrack.externalId,
            title: albumTrack.title,
            subtitle: formatDuration(albumTrack.duration),
            cover: track.album.cover,
            averageRating: albumTrack.averageRating,
          }))}
        />
      </div>

      <EntityReviews entityType="track" externalId={track.externalId} />
    </div>
  );
};

export default TrackDetail;