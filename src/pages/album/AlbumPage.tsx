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
import { FaCompactDisc } from "react-icons/fa";
import "../detail.css";
import "./AlbumPage.css";

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
    <div className="app-container detail-page album-detail">
      <div className="detail-top">
        <DetailHero
          image={album.cover}
          title={album.title}
          rating={album.averageRating}
        >
          <div className="album-hero-info">
            <Link
              to={entityPath("artist", album.artist.id)}
              className="link album-hero-artist"
            >
              {album.artist.name}
            </Link>
            <div className="album-hero-meta">
              <span>
                {formatCount(album.tracks.length, "canción", "canciones")}
              </span>
              <span>{formatDuration(album.duration)}</span>
              {album.releaseDate && (
                <span>{album.releaseDate.slice(0, 4)}</span>
              )}
            </div>
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
        onReviewSaved={reload}
      />
    </div>
  );
};

export default AlbumPage;
