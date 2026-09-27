import TrackCard from "../trackCard/TrackCard";
import { getLatestReviewedTracks } from "../../../../api/reviews";
import { useFetch } from "../../../../hooks/useFetch";
import "./LatestReviewedTracks.css";

const TRACKS_LIMIT = 5;

const loadLatestReviewedTracks = () => getLatestReviewedTracks(TRACKS_LIMIT);

const LatestReviewedTracks = () => {
  const { data: tracks, loading, error } = useFetch(loadLatestReviewedTracks);

  return (
    <section className="latest-reviewed-tracks-section">
      <h2 className="text-center latest-reviewed-tracks-title">
        Últimas canciones reseñadas
      </h2>

      {loading && <p className="status-message">Cargando canciones...</p>}

      {!loading && error && (
        <p className="status-message">
          No se pudieron cargar las canciones.
        </p>
      )}

      {!loading && !error && (tracks === null || tracks.length === 0) && (
        <p className="status-message">
          Todavía no hay canciones reseñadas.
        </p>
      )}

      {!loading && !error && tracks !== null && tracks.length > 0 && (
        <div className="latest-reviewed-tracks-list">
          {tracks.map((track) => (
            <TrackCard key={track.externalId} track={track} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestReviewedTracks;