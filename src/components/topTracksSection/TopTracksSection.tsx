import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import type {
  ArtistAlbum,
  ArtistTopTrack,
} from "../../services/artist.service";
import "./TopTracksSection.css";

interface TopTracksSectionProps {
  topTracks: ArtistTopTrack[];
  albums: ArtistAlbum[];
}

const TopTracksSection = ({ topTracks, albums }: TopTracksSectionProps) => {
  const albumCover = new Map(
    albums.map((album) => [album.title, album.cover_big]),
  );

  const tracks = topTracks.slice(0, 5);

  if (tracks.length === 0) {
    return (
      <section className="top-tracks">
        <h2 className="top-tracks-header">Canciones mejor valoradas</h2>
        <p className="top-tracks-empty">
          Todavía no hay canciones puntuadas para este artista.
        </p>
      </section>
    );
  }

  return (
    <section className="top-tracks">
      <h2 className="top-tracks-header">Canciones mejor valoradas</h2>
      <ol className="top-tracks-list">
        {tracks.map((track, index) => (
          <li className="top-tracks-item" key={track.externalId}>
            <span className="top-tracks-rank">{index + 1}</span>
            <img
              src={
                albumCover.get(track.album.title) ?? track.album.cover_medium
              }
              alt={`Portada del álbum ${track.album.title}`}
              className="top-tracks-cover"
            />
            <div className="top-tracks-meta">
              <Link
                to={`/song/${track.externalId}`}
                className="top-tracks-title"
              >
                {track.title}
              </Link>
              <p className="top-tracks-album">{track.album.title}</p>
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

export default TopTracksSection;
