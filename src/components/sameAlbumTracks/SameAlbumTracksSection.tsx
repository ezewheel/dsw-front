import type { AlbumSong } from "../../api/musical-entity";
import { SongListItem } from "../songList/SongList";
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
      <section className="same-album-tracks">
        <h2 className="same-album-tracks-header">Canciones del mismo álbum</h2>
        <p className="same-album-tracks-empty">
          No hay canciones cargadas para este álbum.
        </p>
      </section>
    );
  }

  return (
    <section className="same-album-tracks">
      <h2 className="same-album-tracks-header">Canciones del mismo álbum</h2>
      <ol className="same-album-tracks-list">
        {tracks.map((track, index) => (
          <SongListItem
            key={track.externalId}
            song={{
              externalId: track.externalId,
              title: track.title,
              subtitle: formatDuration(track.duration),
              cover,
              averageRating: track.averageRating,
            }}
            rank={index + 1}
          />
        ))}
      </ol>
    </section>
  );
};

export default SameAlbumTracksSection;