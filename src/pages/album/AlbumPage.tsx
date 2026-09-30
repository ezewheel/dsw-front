import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { getAlbumDetail } from "../../api/musical-entity";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import TrackList from "../../components/trackList/TrackList";
import DetailHero from "../../components/detailHero/DetailHero";
import DetailMetaItem from "../../components/detailMetaItem/DetailMetaItem";
import ReviewCallToAction from "../../components/reviewCallToAction/ReviewCallToAction";
import NotFound from "../../components/notFound/NotFound";
import { entityPath } from "../../utils/routes";
import { formatCount, formatDuration } from "../../utils/format";
import { useFetch } from "../../hooks/useFetch";
import { useOwnReview } from "../../hooks/useOwnReview";
import {
  FaClock,
  FaCommentDots,
  FaCompactDisc,
  FaMicrophone,
  FaMusic,
} from "react-icons/fa";
import "../detail.css";

const AlbumPage = () => {
  const { id = "" } = useParams();

  const { data: album, loading, error, reload } = useFetch(
    useCallback(() => getAlbumDetail(id), [id]),
  );
  const ownReview = useOwnReview("album", id);

  if (loading) {
    return (
      <div className="app-container detail-page">
        <p className="status-message">Cargando álbum...</p>
      </div>
    );
  }

  if (error || album === null) {
    return (
      <div className="app-container detail-page">
        <NotFound
          icon={<FaCompactDisc />}
          title="Álbum no encontrado"
          text="No encontramos un álbum con ese id, o el servicio no está disponible en este momento."
        />
      </div>
    );
  }

  return (
    <div className="app-container detail-page">
      <div className="detail-top detail-top-reversed">
        <DetailHero
          image={album.cover}
          title={album.title}
          rating={album.averageRating}
        >
          <div className="detail-meta">
            <DetailMetaItem
              icon={FaMicrophone}
              to={entityPath("artist", album.artist.id)}
            >
              {album.artist.name}
            </DetailMetaItem>
            <DetailMetaItem icon={FaMusic}>
              {formatCount(album.tracks.length, "canción", "canciones")}
            </DetailMetaItem>
            <DetailMetaItem icon={FaClock}>
              {formatDuration(album.duration)}
            </DetailMetaItem>
            <DetailMetaItem icon={FaCommentDots}>
              {formatCount(album.ratingsCount, "reseña", "reseñas")}
            </DetailMetaItem>
          </div>
          <ReviewCallToAction ownReview={ownReview} />
        </DetailHero>

        <TrackList
          title="Canciones del álbum"
          emptyMessage="Este álbum no tiene canciones."
          showRank={false}
          tracks={album.tracks.map((track) => ({
            externalId: track.externalId,
            title: track.title,
            subtitle: formatDuration(track.duration),
            cover: album.cover,
            averageRating: track.averageRating,
          }))}
        />
      </div>

      <EntityReviews
        entityType="album"
        externalId={album.externalId}
        ownReview={ownReview}
        onReviewChange={reload}
      />
    </div>
  );
};

export default AlbumPage;
