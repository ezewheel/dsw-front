import TrackCard, { TrackCardSkeleton } from "../trackCard/TrackCard";
import { getLatestReviewedTracks } from "../../../../api/reviews";
import { useFetch } from "../../../../hooks/useFetch";
import "./LatestReviewedTracks.css";

const TRACKS_LIMIT = 5;

const loadLatestReviewedTracks = () => getLatestReviewedTracks(TRACKS_LIMIT);

const LatestReviewedTracks = () => {
  const { data: tracks, loading, error } = useFetch(loadLatestReviewedTracks);

  return (
    <section>
      <h2 className="section-title">
        Últimas canciones reseñadas
      </h2>

      {loading && (
        <div
          className="latest-reviewed-tracks-list"
          aria-busy="true"
          aria-label="Cargando canciones"
        >
          {Array.from({ length: TRACKS_LIMIT }, (_, index) => (
            <TrackCardSkeleton key={index} />
          ))}
        </div>
      )}

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