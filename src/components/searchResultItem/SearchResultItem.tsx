import { Link } from "react-router-dom";
import { FaMusic } from "react-icons/fa";
import type { SearchResult } from "../../api/musical-entity";
import { entityPath } from "../../utils/routes";
import { formatCount } from "../../utils/format";
import AverageRating from "../averageRating/AverageRating";
import "./SearchResultItem.css";

const resultImage = (result: SearchResult): string => {
  switch (result.type) {
    case "artist":
      return result.picture_medium ?? "";
    case "album":
      return result.cover_medium ?? "";
    case "track":
      return result.album?.cover_medium ?? "";
  }
};

const resultTitle = (result: SearchResult): string =>
  result.type === "artist" ? result.name : result.title;

const resultSubtitle = (result: SearchResult): string => {
  switch (result.type) {
    case "track":
      return `${result.artist.name} · ${result.album.title}`;
    case "album":
      return result.artist.name;
    case "artist":
      return "";
  }
};

const SearchResultItem = ({ result }: { result: SearchResult }) => {
  const image = resultImage(result);
  const subtitle = resultSubtitle(result);

  return (
    <Link
      to={entityPath(result.type, result.externalId)}
      className="search-result-item"
    >
      {image ? (
        <img src={image} alt={`Portada de ${resultTitle(result)}`} />
      ) : (
        <div className="search-result-placeholder" aria-hidden="true">
          <FaMusic />
        </div>
      )}

      <div className="search-result-info">
        <div className="search-result-title">{resultTitle(result)}</div>
        {subtitle && <div className="search-result-meta">{subtitle}</div>}
      </div>

      <div className="search-result-stats">
        <AverageRating value={result.averageRating} />
        <span className="search-result-reviews">
          {formatCount(result.reviewsCount, "reseña", "reseñas")}
        </span>
      </div>
    </Link>
  );
};

export default SearchResultItem;
