import { Link } from "react-router-dom";
import type { EntitySummary } from "../../../../api/musical-entity";
import { entityPath } from "../../../../utils/routes";
import AverageRating from "../../../../components/averageRating/AverageRating";
import "./TopListColumn.css";

type TopListColumnProps = {
  title: string;
  items: EntitySummary[];
};

const TopListColumn = ({ title, items }: TopListColumnProps) => {
  return (
    <section className="top-list">
      <h3 className="top-list-title">{title}</h3>
      {items.map((item, i) => (
        <div className="top-item" key={item.externalId}>
          <span className="top-rank">{i + 1}</span>
          <img src={item.cover} alt={item.title} />
          <div className="top-info">
            <Link to={entityPath(item.type, item.externalId)} className="link">
              {item.title}
            </Link>
            <AverageRating value={item.averageRating} />
          </div>
        </div>
      ))}
    </section>
  );
};

export default TopListColumn;
