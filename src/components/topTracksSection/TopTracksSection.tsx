import { Link } from "react-router-dom";
import type {
  ArtistAlbum,
  ArtistTopTrack,
} from "../../services/artist.service";
import "./TopTracksSection.css";

type TopTracksSectionProps = {
  topTracks: ArtistTopTrack[];
  albums: ArtistAlbum[];
};

const formatRating = (value: number | null): string =>
  value === null || value === undefined
    ? "Sin puntaje"
    : `${value.toFixed(1)} / 5`;

const TopTracksSection = ({ topTracks, albums }: TopTracksSectionProps) => {
  if (topTracks.length === 0) {
    return (
      <section className="artist-top-tracks">
        <h2>Las 5 canciones mejor puntuadas</h2>
        <p>No hay canciones mejor puntuadas para este artista.</p>
      </section>
    );
  }

  const albumCover = new Map(
    albums.map((album) => [album.title, album.cover_big]),
  );

  return (
    <section className="artist-top-tracks">
      <h2>Las 5 canciones mejor puntuadas</h2>
      {topTracks.slice(0, 5).map((track) => (
        <div className="artist-song-card" key={track.externalId}>
          <img
            src={albumCover.get(track.album.title) ?? track.album.cover_medium}
            alt={`Portada del álbum ${track.album.title}`}
            className="artist-song-cover"
          />
          <div className="artist-song-info">
            <h3>
              <Link
                to={`/song/${track.externalId}`}
                className="artist-link artist-song-title"
              >
                {track.title}
              </Link>
            </h3>
            <div className="artist-song-info-foot">
              <p className="artist-song-album">{track.album.title}</p>
              <span className="artist-song-score">
                {formatRating(track.averageRating)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TopTracksSection;