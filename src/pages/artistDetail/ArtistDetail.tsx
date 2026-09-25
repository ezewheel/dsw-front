import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { getArtistDetail } from "../../api/musical-entity";
import SongList from "../../components/songList/SongList";
import AlbumCarousel from "../../components/albumCarousel/AlbumCarousel";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import { useFetch } from "../../hooks/useFetch";
import { FaStar, FaUser } from "react-icons/fa";
import "./ArtistDetail.css";

const ArtistDetail = () => {
  const { id = "" } = useParams();

  const { data: artist, loading, error } = useFetch(
    useCallback(() => getArtistDetail(id), [id]),
  );

  if (loading) {
    return (
      <div className="app-container artist-detail loading-message">
        <p>Cargando artista...</p>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="app-container artist-detail">
        <div className="artist-not-found">
          <span className="artist-not-found-icon" aria-hidden="true">
            <FaUser />
          </span>
          <h1 className="artist-not-found-title">Artista no encontrado</h1>
          <p className="artist-not-found-text">
            No encontramos un artista con ese id, o el servicio no está
            disponible en este momento.
          </p>
          <Link to="/" className="app-btn app-btn-primary artist-not-found-cta">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const albumCovers = new Map(
    artist.albums.map((album) => [album.title, album.cover_big]),
  );
  const trackItems = artist.topTracks.map((track) => ({
    externalId: track.externalId,
    title: track.title,
    subtitle: track.album.title,
    cover: albumCovers.get(track.album.title) ?? track.album.cover_medium,
    averageRating: track.averageRating,
  }));

  return (
    <div className="app-container artist-detail">
      <div className="artist-detail-top">
        <header className="artist-hero">
          <img
            src={artist.picture_big}
            alt={`Imagen de ${artist.name}`}
            className="artist-hero-img"
          />
          <div className="artist-hero-overlay">
            <h1>{artist.name}</h1>
            <span
              className={`artist-rating${
                artist.averageRating === null ? " artist-rating-missing" : ""
              }`}
            >
              {artist.averageRating === null ? (
                "Sin puntaje"
              ) : (
                <>
                  {artist.averageRating.toFixed(1)}
                  <FaStar className="artist-rating-star" aria-hidden="true" />
                </>
              )}
            </span>
          </div>
        </header>

        <SongList title="Canciones mejor valoradas" songs={trackItems} />
      </div>

      <AlbumCarousel key={artist.externalId} albums={artist.albums} />
      <EntityReviews entityType="artist" externalId={artist.externalId} />
    </div>
  );
};

export default ArtistDetail;
