import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getArtistDetail,
  getArtistIdByName,
  type ArtistDetail as ArtistDetailData,
} from "../../services/artist.service";
import TopTracksSection from "../../components/topTracksSection/TopTracksSection";
import AlbumCarousel from "../../components/albumCarousel/AlbumCarousel";
import EntityReviews from "../../components/entityReviews/EntityReviews";
import "./ArtistDetail.css";
import "../songDetail/detail.css";

function formatRating(value: number | null): string {
  if (value === null || value === undefined) return "Sin puntaje";
  return `${value.toFixed(1)} / 5`;
}

const ArtistDetail = () => {
  const { name } = useParams();
  const reference = decodeURIComponent(name ?? "");

  const [artist, setArtist] = useState<ArtistDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      setArtist(null);

      try {
        const trimmed = reference.trim();
        if (!trimmed) throw new Error("Referencia vacía");

        const id = /^\d+$/.test(trimmed)
          ? trimmed
          : await getArtistIdByName(trimmed);

        if (!id) throw new Error("Artista no encontrado");

        const detail = await getArtistDetail(id);
        if (!cancelled) setArtist(detail);
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
      <div className="app-container artist-detail">
        <p>Cargando artista...</p>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="app-container artist-detail">
        <p>Artista no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const ratedTracks = artist.topTracks.filter(
    (t) => t.averageRating !== null && t.averageRating !== undefined,
  );
  const avgRating =
    ratedTracks.length > 0
      ? ratedTracks.reduce((acc, t) => acc + (t.averageRating as number), 0) /
        ratedTracks.length
      : null;

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
            <span className="artist-rating">{formatRating(avgRating)}</span>
          </div>
        </header>

        <TopTracksSection topTracks={artist.topTracks} albums={artist.albums} />
      </div>

      <AlbumCarousel key={artist.externalId} albums={artist.albums} />
      <EntityReviews entityType="artist" externalId={artist.externalId} />
    </div>
  );
};

export default ArtistDetail;
