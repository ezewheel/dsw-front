import { useEffect, useState } from "react";
import SongItem from "../songItem/SongItem";
import {
  getLatestReviewedSongs,
  type ReviewedSong,
} from "../../services/reviews.service";
import "./FeaturedSongs.css";

const FEATURED_LIMIT = 5;

const FeaturedSongs = () => {
  const [songs, setSongs] = useState<ReviewedSong[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(false);
      setSongs(null);

      try {
        const data = await getLatestReviewedSongs(FEATURED_LIMIT);
        if (!active) return;
        setSongs(data);
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
  }, []);

  return (
    <section className="featured-songs-section">
      <h2 className="text-center featured-songs-title">
        Últimas canciones reseñadas
      </h2>

      {loading && <p className="featured-songs-status">Cargando canciones...</p>}

      {!loading && error && (
        <p className="featured-songs-status">
          No se pudieron cargar las canciones.
        </p>
      )}

      {!loading && !error && (songs === null || songs.length === 0) && (
        <p className="featured-songs-status">
          Todavía no hay canciones reseñadas.
        </p>
      )}

      {!loading && !error && songs !== null && songs.length > 0 && (
        <div className="featured-songs-list">
          {songs.map((song) => (
            <SongItem
              key={song.externalId}
              id={song.externalId}
              title={song.title ?? "Título no disponible"}
              artist={song.artist ?? ""}
              album={song.album ?? ""}
              score={song.averageRating}
              duration={song.duration ?? 0}
              imageUrl={song.cover ?? ""}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedSongs;