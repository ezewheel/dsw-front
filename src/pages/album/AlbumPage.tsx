import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { getAlbumDetail } from "../../api/musical-entity";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import TrackList from "../../components/trackList/TrackList";
import DetailHero from "../../components/detailHero/DetailHero";
import NotFound from "../../components/notFound/NotFound";
import { entityPath } from "../../utils/routes";
import { formatCount, formatDuration } from "../../utils/format";
import { useFetch } from "../../hooks/useFetch";
import {
  FaCalendarAlt,
  FaClock,
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
            <div className="detail-meta-item">
              <FaMicrophone className="detail-meta-icon" aria-hidden="true" />
              <Link
                to={entityPath("artist", album.artist.id)}
                className="detail-meta-link"
                title={album.artist.name}
              >
                {album.artist.name}
              </Link>
            </div>
            <div className="detail-meta-item">
              <FaClock className="detail-meta-icon" aria-hidden="true" />
              <span>{formatDuration(album.duration)}</span>
            </div>
            <div className="detail-meta-item">
              <FaMusic className="detail-meta-icon" aria-hidden="true" />
              <span>
                {formatCount(album.tracks.length, "canción", "canciones")}
              </span>
            </div>
            {album.releaseDate && (
              <div className="detail-meta-item">
                <FaCalendarAlt
                  className="detail-meta-icon"
                  aria-hidden="true"
                />
                <span>{album.releaseDate.slice(0, 4)}</span>
              </div>
            )}
          </div>
        </DetailHero>

        <TrackList
          title="Canciones del álbum"
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
        onReviewChange={reload}
      />
    </div>
  );
};

export default AlbumPage;
