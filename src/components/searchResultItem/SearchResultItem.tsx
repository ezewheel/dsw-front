import { Link } from "react-router-dom";
import { FaStar, FaMusic } from "react-icons/fa";
import type { SearchResult } from "../../services/search.service";
import { entityPath } from "../../utils/routes";
import "./SearchResultItem.css";

const formatRating = (rating: number | null): string =>
  rating === null ? "—" : rating.toFixed(1);

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
        <span className="search-result-rating">
          <FaStar aria-hidden="true" />
          {formatRating(result.averageRating)}
        </span>
        <span className="search-result-reviews">
          {result.reviewsCount}{" "}
          {result.reviewsCount === 1 ? "reseña" : "reseñas"}
        </span>
      </div>
    </Link>
  );
};

export default SearchResultItem;
