import { Link } from "react-router-dom";
import { entityPath } from "../../utils/routes";
import AverageRating from "../averageRating/AverageRating";
import "./SongList.css";

type TrackItem = {
  externalId: string;
  title: string;
  subtitle?: string;
  cover: string;
  averageRating: number | null;
};

type SongListItemProps = {
  song: TrackItem;
  rank: number;
  showRank?: boolean;
};

const SongListItem = ({
  song,
  rank,
  showRank = true,
}: SongListItemProps) => (
  <li
    className={`song-list-item${showRank ? "" : " song-list-item-no-rank"}`}
  >
    {showRank && <span className="song-list-rank">{rank}</span>}
    <img
      src={song.cover}
      alt={`Portada de ${song.title}`}
      className="song-list-cover"
      loading="lazy"
    />
    <div className="song-list-meta">
      <Link
        to={entityPath("track", song.externalId)}
        className="song-list-title"
      >
        {song.title}
      </Link>
      {song.subtitle && (
        <p className="song-list-subtitle">{song.subtitle}</p>
      )}
    </div>
    <AverageRating value={song.averageRating} />
  </li>
);

type SongListProps = {
  title: string;
  songs: TrackItem[];
  showRank?: boolean;
};

const SongList = ({ title, songs, showRank = true }: SongListProps) => {
  if (songs.length === 0) {
    return (
      <section className="song-list">
        <h2 className="song-list-header">{title}</h2>
        <p className="song-list-empty">No hay canciones para mostrar.</p>
      </section>
    );
  }

  return (
    <section className="song-list">
      <h2 className="song-list-header">{title}</h2>
      <ol className="song-list-list">
        {songs.map((song, index) => (
          <SongListItem
            key={song.externalId}
            song={song}
            rank={index + 1}
            showRank={showRank}
          />
        ))}
      </ol>
    </section>
  );
};

export default SongList;