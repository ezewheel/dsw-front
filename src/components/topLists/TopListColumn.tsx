import { Link } from "react-router-dom";
import type { TopRatedItem } from "../../api/musical-entity";
import { entityPath } from "../../utils/routes";
import AverageRating from "../averageRating/AverageRating";
import "./TopListColumn.css";

type TopListColumnProps = {
  title: string;
  items: TopRatedItem[];
};

const TopListColumn = ({ title, items }: TopListColumnProps) => {
  return (
    <section className="top-list">
      <h3 className="text-center top-list-title">{title}</h3>
      {items.map((item, i) => {
        const itemTitle = item.title ?? "Contenido no disponible";

        return (
          <div className="top-item" key={item.externalId}>
            <span className="top-rank">{i + 1}</span>
            {item.cover ? (
              <img src={item.cover} alt={itemTitle} />
            ) : (
              <div
                className="top-item-cover-placeholder"
                aria-label={itemTitle}
              >
                ♪
              </div>
            )}
            <div className="top-info">
              <Link
                to={entityPath(item.type, item.externalId)}
                className="link"
              >
                {itemTitle}
              </Link>
              <AverageRating value={item.averageRating} />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default TopListColumn;
