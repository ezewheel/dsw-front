import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getArtistDetail,
  getArtistIdByName,
  type ArtistDetail as ArtistDetailData,
} from "../../services/artist.service";
import TopTracksSection from "../../components/topTracksSection/TopTracksSection";
import AlbumCarousel from "../../components/albumCarousel/AlbumCarousel";
import "./ArtistDetail.css";
import "../songDetail/detail.css";

const formatRating = (value: number | null): string =>
  value === null || value === undefined
    ? "Sin puntaje"
    : `${value.toFixed(1)} / 5`;

const ArtistDetail = () => {
  const { name } = useParams();
  const reference = decodeURIComponent(name ?? "");

  const [artist, setArtist] = useState<ArtistDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(false);
      setArtist(null);

      try {
        const trimmed = reference.trim();
        if (trimmed === "") {
          throw new Error("Referencia vacía");
        }
        const id = /^\d+$/.test(trimmed)
          ? trimmed
          : await getArtistIdByName(trimmed);
        if (id === null) {
          throw new Error("Artista no encontrado");
        }
        const detail = await getArtistDetail(id);
        if (active) setArtist(detail);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [reference]);

  if (loading) {
    return (
      <div className="app-container artist-detail">
        <p>Cargando artista...</p>
      </div>
    );
  }

  if (error || artist === null) {
    return (
      <div className="app-container artist-detail">
        <p>Artista no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const ratedTracks = artist.topTracks.filter(
    (track) => track.averageRating !== null && track.averageRating !== undefined,
  );
  const rating =
    ratedTracks.length > 0
      ? ratedTracks.reduce((acc, t) => acc + (t.averageRating as number), 0) /
        ratedTracks.length
      : null;

  return (
    <div className="app-container artist-detail">
      <header className="artist-hero">
        <div className="artist-hero-media">
          <img
            src={artist.picture_big}
            alt={`Imagen de ${artist.name}`}
            className="artist-image"
          />
          <h1>{artist.name}</h1>
          <div className="artist-facts">
            <span className="artist-rating">{formatRating(rating)}</span>
            <span className="artist-facts-dot">•</span>
            <span>
              {artist.albums.length} álbum
              {artist.albums.length === 1 ? "" : "es"}
            </span>
          </div>
        </div>
      </header>

      <TopTracksSection topTracks={artist.topTracks} albums={artist.albums} />
      <AlbumCarousel key={artist.externalId} albums={artist.albums} />
    </div>
  );
};

export default ArtistDetail;