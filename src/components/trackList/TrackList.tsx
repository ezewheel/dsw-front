import { Link } from "react-router-dom";
import { entityPath } from "../../utils/routes";
import AverageRating from "../averageRating/AverageRating";
import "./TrackList.css";

type TrackItem = {
  externalId: string;
  title: string;
  subtitle?: string;
  cover: string;
  averageRating: number | null;
};

type TrackListItemProps = {
  track: TrackItem;
  rank: number;
  showRank?: boolean;
};

const TrackListItem = ({
  track,
  rank,
  showRank = true,
}: TrackListItemProps) => (
  <li
    className={`track-list-item${showRank ? "" : " track-list-item-no-rank"}`}
  >
    {showRank && <span className="track-list-rank">{rank}</span>}
    <img
      src={track.cover}
      alt={`Portada de ${track.title}`}
      className="track-list-cover"
      loading="lazy"
    />
    <div className="track-list-meta">
      <Link
        to={entityPath("track", track.externalId)}
        className="track-list-title"
      >
        {track.title}
      </Link>
      {track.subtitle && (
        <p className="track-list-subtitle">{track.subtitle}</p>
      )}
    </div>
    <AverageRating value={track.averageRating} />
  </li>
);

type TrackListProps = {
  title: string;
  tracks: TrackItem[];
  showRank?: boolean;
};

const TrackList = ({ title, tracks, showRank = true }: TrackListProps) => {
  if (tracks.length === 0) {
    return (
      <section className="track-list">
        <h2 className="track-list-header">{title}</h2>
        <p className="track-list-empty">
          Nadie reseñó una canción de este artista aún. ¡Se el primero!
        </p>
      </section>
    );
  }

  return (
    <section className="track-list">
      <h2 className="track-list-header">{title}</h2>
      <ol className="track-list-list">
        {tracks.map((track, index) => (
          <TrackListItem
            key={track.externalId}
            track={track}
            rank={index + 1}
            showRank={showRank}
          />
        ))}
      </ol>
    </section>
  );
};

export default TrackList;
