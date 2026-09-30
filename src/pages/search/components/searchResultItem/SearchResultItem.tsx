import { Link } from "react-router-dom";
import type { EntitySummary } from "../../../../api/musical-entity";
import { entityPath } from "../../../../utils/routes";
import { formatCount } from "../../../../utils/format";
import AverageRating from "../../../../components/averageRating/AverageRating";
import "./SearchResultItem.css";

const SearchResultItem = ({ result }: { result: EntitySummary }) => (
  <Link
    to={entityPath(result.type, result.externalId)}
    className="search-result-item"
  >
    <img src={result.cover} alt={`Portada de ${result.title}`} />

    <div className="search-result-info">
      <div className="search-result-title">{result.title}</div>
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

export default SearchResultItem;
