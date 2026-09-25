import { Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import type { EntitySummary } from "../../api/musical-entity";
import { entityPath } from "../../utils/routes";
import { formatCount } from "../../utils/format";
import AverageRating from "../averageRating/AverageRating";
import "./SearchResultItem.css";

const SearchResultItem = ({ result }: { result: EntitySummary }) => {
  const title = result.title ?? "Contenido no disponible";

  return (
    <Link
      to={entityPath(result.type, result.externalId)}
      className="search-result-item"
    >
      {result.cover ? (
        <img src={result.cover} alt={`Portada de ${title}`} />
      ) : (
        <div className="search-result-placeholder" aria-hidden="true">
          <FaMusic />
        </div>
      )}

      <div className="search-result-info">
        <div className="search-result-title">{title}</div>
        {result.artist && (
          <div className="search-result-meta">{result.artist}</div>
        )}
      </div>

      <div className="search-result-stats">
        <AverageRating value={result.averageRating} />
        <span className="search-result-ratings">
          {formatCount(result.ratingsCount, "calificación", "calificaciones")}
        </span>
      </div>
    </Link>
  );
};

export default SearchResultItem;
