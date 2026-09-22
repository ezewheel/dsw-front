import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./TopListColumn.css";

export type TopListEntry = {
  name: string;
  imageUrl: string;
  score: number;
  to: string;
};

type TopListColumnProps = {
  title: string;
  entries: TopListEntry[];
  imageAlt: (entry: TopListEntry) => string;
};

const TopListColumn = ({ title, entries, imageAlt }: TopListColumnProps) => {
  return (
    <section className="top-list">
      <h3 className="text-center top-list-title">{title}</h3>
      {entries.map((entry, i) => (
        <div className="top-item" key={entry.to}>
          <span className="top-rank">{i + 1}</span>
          {entry.imageUrl ? (
            <img src={entry.imageUrl} alt={imageAlt(entry)} />
          ) : (
            <div
              className="top-item-cover-placeholder"
              aria-label={imageAlt(entry)}
            >
              ♪
            </div>
          )}
          <div className="top-info">
            <Link to={entry.to} className="song-title-link">
              {entry.name}
            </Link>
            <div className="top-rating">
              <FaStar aria-hidden="true" />
              <span>{entry.score.toFixed(1)} / 5</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default TopListColumn;
