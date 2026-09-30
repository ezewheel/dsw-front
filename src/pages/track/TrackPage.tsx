import { useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  getAlbumDetail,
  getTrackDetail,
  type AlbumTrack,
} from "../../api/musical-entity";
import TrackList from "../../components/trackList/TrackList";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import DetailHero from "../../components/detailHero/DetailHero";
import DetailMetaItem from "../../components/detailMetaItem/DetailMetaItem";
import ReviewCallToAction from "../../components/reviewCallToAction/ReviewCallToAction";
import NotFound from "../../components/notFound/NotFound";
import { entityPath } from "../../utils/routes";
import { formatCount, formatDuration } from "../../utils/format";
import { useFetch } from "../../hooks/useFetch";
import { useOwnReview } from "../../hooks/useOwnReview";
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
  const ownReview = useOwnReview("track", id);

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
            <DetailMetaItem
              icon={FaMicrophone}
              to={entityPath("artist", track.artist.id)}
            >
              {track.artist.name}
            </DetailMetaItem>
            <DetailMetaItem
              icon={FaCompactDisc}
              to={entityPath("album", track.album.id)}
            >
              {track.album.title}
            </DetailMetaItem>
            <DetailMetaItem icon={FaClock}>
              {formatDuration(track.duration)}
            </DetailMetaItem>
            <DetailMetaItem icon={FaCommentDots}>
              {formatCount(track.ratingsCount, "reseña", "reseñas")}
            </DetailMetaItem>
          </div>
          <ReviewCallToAction ownReview={ownReview} />
        </DetailHero>

        <TrackList
          title="Canciones del mismo álbum"
          emptyMessage="No se pudieron cargar las canciones del álbum."
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
        ownReview={ownReview}
        onReviewChange={reload}
      />
    </div>
  );
};

export default TrackPage;