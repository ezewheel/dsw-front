import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAlbumDetail,
  getTrackDetail,
  type AlbumTrack,
} from "../../api/musical-entity";
import TrackList from "../../components/trackList/TrackList";
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

const loadTrackPage = async (id: string) => {
  const track = await getTrackDetail(id);
  const albumTracks = await getAlbumDetail(String(track.album.id))
    .then((album) => album.tracks)
    .catch((): AlbumTrack[] => []);
  return { track, albumTracks };
};

const TrackPage = () => {
  const { id = "" } = useParams();

  const { data, loading, error, reload } = useFetch(
    useCallback(() => loadTrackPage(id), [id]),
  );

  if (loading) {
    return (
      <div className="app-container detail-page">
        <p className="status-message">Cargando canción...</p>
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
      <div className="detail-top detail-top-reversed">
        <DetailHero
          image={track.album.cover}
          title={track.title}
          rating={track.averageRating}
        >
          <div className="detail-meta">
            <div className="detail-meta-item">
              <FaMicrophone
                className="detail-meta-icon"
                aria-hidden="true"
              />
              <Link
                to={entityPath("artist", track.artist.id)}
                className="detail-meta-link"
                title={track.artist.name}
              >
                {track.artist.name}
              </Link>
            </div>
            <div className="detail-meta-item">
              <FaClock className="detail-meta-icon" aria-hidden="true" />
              <span>
                {formatDuration(track.duration)}
              </span>
            </div>
            <div className="detail-meta-item">
              <FaCompactDisc
                className="detail-meta-icon"
                aria-hidden="true"
              />
              <Link
                to={entityPath("album", track.album.id)}
                className="detail-meta-link"
                title={track.album.title}
              >
                {track.album.title}
              </Link>
            </div>
            <div className="detail-meta-item">
              <FaCommentDots
                className="detail-meta-icon"
                aria-hidden="true"
              />
              <span>
                {formatCount(
                  track.ratingsCount,
                  "calificación",
                  "calificaciones",
                )}
              </span>
            </div>
          </div>
        </DetailHero>

        <TrackList
          title="Canciones del mismo álbum"
          tracks={albumTracks.map((albumTrack) => ({
            externalId: albumTrack.externalId,
            title: albumTrack.title,
            subtitle: formatDuration(albumTrack.duration),
            cover: track.album.cover,
            averageRating: albumTrack.averageRating,
          }))}
        />
      </div>

      <EntityReviews
        entityType="track"
        externalId={track.externalId}
        onReviewSaved={reload}
      />
    </div>
  );
};

export default TrackPage;