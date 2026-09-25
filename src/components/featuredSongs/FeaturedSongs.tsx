import SongItem from "./songItem/SongItem";
import { getLatestReviewedSongs } from "../../api/reviews";
import { useFetch } from "../../hooks/useFetch";
import "./FeaturedSongs.css";

const FEATURED_LIMIT = 5;

const loadFeaturedSongs = () => getLatestReviewedSongs(FEATURED_LIMIT);

const FeaturedSongs = () => {
  const { data: songs, loading, error } = useFetch(loadFeaturedSongs);

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
            <SongItem key={song.externalId} song={song} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedSongs;