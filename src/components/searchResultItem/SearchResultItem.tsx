import { Link } from "react-router-dom";
import { FaStar, FaMusic } from "react-icons/fa";
import type { SearchResult } from "../../services/search.service";
import "./SearchResultItem.css";

const formatRating = (rating: number | null): string =>
  rating === null ? "Sin puntaje" : rating.toFixed(1);

const resultRoute = (result: SearchResult): string => {
  switch (result.type) {
    case "track":
      return `/song/${result.externalId}`;
    case "album":
      return `/album/${encodeURIComponent(result.title)}`;
    case "artist":
      return `/artist/${encodeURIComponent(result.name)}`;
  }
};

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
      return `${result.artist.name} - ${result.album.title}`;
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
    <Link to={resultRoute(result)} className="search-result-item">
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
        <span>{result.reviewsCount} reviews</span>
        <span className="search-result-rating">
          {result.averageRating !== null && <FaStar aria-hidden="true" />}
          {formatRating(result.averageRating)}
        </span>
      </div>
    </Link>
  );
};

export default SearchResultItem;