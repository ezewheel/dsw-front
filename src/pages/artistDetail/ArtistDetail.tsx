import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getArtistDetail,
  getArtistIdByName,
  type ArtistDetail as ArtistDetailData,
} from "../../services/artist.service";
import SongList from "../../components/songList/SongList";
import AlbumCarousel from "../../components/albumCarousel/AlbumCarousel";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import { getEntityReviews } from "../../services/reviews.service";
import { FaStar, FaUser } from "react-icons/fa";
import "./ArtistDetail.css";
import "../songDetail/detail.css";

const ArtistDetail = () => {
  const { name } = useParams();
  const reference = decodeURIComponent(name ?? "");

  const [artist, setArtist] = useState<ArtistDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [artistScore, setArtistScore] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      setArtist(null);
      setArtistScore(null);

      try {
        const trimmed = reference.trim();
        if (!trimmed) throw new Error("Referencia vacía");

        const id = /^\d+$/.test(trimmed)
          ? trimmed
          : await getArtistIdByName(trimmed);

        if (!id) throw new Error("Artista no encontrado");

        const detail = await getArtistDetail(id);
        if (cancelled) return;
        setArtist(detail);

        try {
          const reviews = await getEntityReviews("artist", id, {
            page: 1,
            pageSize: 50,
          });
          const values = reviews.items
            .map((review) => review.value)
            .filter((value): value is number => typeof value === "number");
          if (cancelled) return;
          setArtistScore(
            values.length > 0
              ? values.reduce((acc, value) => acc + value, 0) / values.length
              : null,
          );
        } catch {
          if (!cancelled) setArtistScore(null);
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
  }, [reference]);

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
            No encontramos un artista con ese nombre, o el servicio no está
            disponible en este momento.
          </p>
          <Link to="/" className="app-btn app-btn-primary artist-not-found-cta">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const ratingTracks = artist.topTracks.filter(
    (t) => t.averageRating !== null && t.averageRating !== undefined,
  );
  const tracksAverage =
    ratingTracks.length > 0
      ? ratingTracks.reduce(
          (acc, t) => acc + (t.averageRating as number),
          0,
        ) / ratingTracks.length
      : null;
  const avgRating = artistScore ?? tracksAverage;

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
                avgRating === null ? " artist-rating-missing" : ""
              }`}
            >
              {avgRating === null ? (
                "Sin puntaje"
              ) : (
                <>
                  {avgRating.toFixed(1)}
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
