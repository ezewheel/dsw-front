import { Link } from "react-router-dom";
import type {
  ArtistAlbum,
  ArtistTopTrack,
} from "../../services/artist.service";
import "./TopTracksSection.css";

interface TopTracksSectionProps {
  topTracks: ArtistTopTrack[];
  albums: ArtistAlbum[];
}

function formatRating(value: number | null): string {
  if (value === null || value === undefined) return "Sin puntaje";
  return `${value.toFixed(1)} / 5`;
}

const TopTracksSection = ({ topTracks, albums }: TopTracksSectionProps) => {
  const albumCover = new Map(
    albums.map((album) => [album.title, album.cover_big]),
  );

  const tracks = topTracks.slice(0, 5);

  return (
    <section className="top-tracks">
      <h2 className="top-tracks-header">Top 5 canciones</h2>
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
              {formatRating(track.averageRating)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TopTracksSection;
