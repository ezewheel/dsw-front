import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { getArtistDetail } from "../../api/musical-entity";
import TrackList from "../../components/trackList/TrackList";
import AlbumCarousel from "./components/albumCarousel/AlbumCarousel";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import DetailHero from "../../components/detailHero/DetailHero";
import NotFound from "../../components/notFound/NotFound";
import { useFetch } from "../../hooks/useFetch";
import { FaUser } from "react-icons/fa";
import "../detail.css";

const ArtistPage = () => {
  const { id = "" } = useParams();

  const { data: artist, loading, error, reload } = useFetch(
    useCallback(() => getArtistDetail(id), [id]),
  );

  if (loading) {
    return (
      <div className="app-container detail-page">
        <p className="status-message">Cargando artista...</p>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="app-container detail-page">
        <NotFound
          icon={<FaUser />}
          title="Artista no encontrado"
          text="No encontramos un artista con ese id, o el servicio no está disponible en este momento."
        />
      </div>
    );
  }

  const trackItems = artist.topTracks.map((track) => ({
    externalId: track.externalId,
    title: track.title,
    subtitle: track.album.title,
    cover: track.album.cover,
    averageRating: track.averageRating,
  }));

  return (
    <div className="app-container detail-page">
      <div className="detail-top">
        <DetailHero
          image={artist.cover}
          title={artist.name}
          rating={artist.averageRating}
        />

        <TrackList title="Canciones mejor valoradas" tracks={trackItems} />
      </div>

      <AlbumCarousel key={artist.externalId} albums={artist.albums} />
      <EntityReviews
        entityType="artist"
        externalId={artist.externalId}
        onReviewSaved={reload}
      />
    </div>
  );
};

export default ArtistPage;
