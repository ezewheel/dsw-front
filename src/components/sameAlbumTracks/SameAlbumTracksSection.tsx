import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import type { AlbumSong } from "../../services/album.service";
import "../topTracksSection/TopTracksSection.css";
import "./SameAlbumTracksSection.css";

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")} min`;
};

interface SameAlbumTracksSectionProps {
  tracks: AlbumSong[];
  cover: string;
}

const SameAlbumTracksSection = ({
  tracks,
  cover,
}: SameAlbumTracksSectionProps) => {
  if (tracks.length === 0) {
    return (
      <section className="top-tracks">
        <h2 className="top-tracks-header">Canciones del mismo álbum</h2>
        <p className="top-tracks-empty">
          No hay canciones cargadas para este álbum.
        </p>
      </section>
    );
  }

  return (
    <section className="top-tracks">
      <h2 className="top-tracks-header">Canciones del mismo álbum</h2>
      <ol className="top-tracks-list">
        {tracks.map((track, index) => (
          <li className="top-tracks-item" key={track.externalId}>
            <span className="top-tracks-rank">{index + 1}</span>
            <img
              src={cover}
              alt={`Portada del álbum de ${track.title}`}
              className="top-tracks-cover"
            />
            <div className="top-tracks-meta">
              <Link
                to={`/song/${track.externalId}`}
                className="top-tracks-title"
              >
                {track.title}
              </Link>
              <p className="top-tracks-album">{formatDuration(track.duration)}</p>
            </div>
            <span className="top-tracks-score">
              {track.averageRating === null ||
              track.averageRating === undefined ? (
                "Sin puntaje"
              ) : (
                <>
                  {track.averageRating.toFixed(1)}
                  <FaStar
                    className="top-tracks-score-star"
                    aria-hidden="true"
                  />
                </>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default SameAlbumTracksSection;