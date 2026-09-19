import SongItem from "../songItem/SongItem";
import "./FeaturedSongs.css";

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  imageUrl: string;
  plays: number;
};

type FeaturedSongsProps = {
  songs: Song[];
  scores: Record<number, number | null>;
  onPlay: (id: number) => void;
};

const FeaturedSongs = ({ songs, scores, onPlay }: FeaturedSongsProps) => {
  const featured = songs.slice(0, 5);

  return (
    <section className="mt-5">
      <h3 className="text-center mb-4">Canciones recomendadas</h3>
      <div className="featured-songs-list">
        {featured.map((song) => (
          <SongItem
            key={song.id}
            id={song.id}
            title={song.title}
            artist={song.artist}
            album={song.album}
            score={scores[song.id] ?? null}
            duration={song.duration}
            imageUrl={song.imageUrl}
            plays={song.plays}
            onPlay={() => onPlay(song.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSongs;
