import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { TopListEntry } from "./topData";
import "./TopListColumn.css";

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
          <img src={entry.imageUrl} alt={imageAlt(entry)} />
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
