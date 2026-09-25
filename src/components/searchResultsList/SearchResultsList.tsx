import type { SearchResult } from "../../api/musical-entity";
import SearchResultItem from "../searchResultItem/SearchResultItem";
import "./SearchResultsList.css";

type SearchResultsListProps = {
  results: SearchResult[];
};

const SearchResultsList = ({ results }: SearchResultsListProps) => (
  <div className="search-results-list" role="list">
    {results.map((result) => (
      <SearchResultItem
        key={`${result.type}-${result.externalId}`}
        result={result}
      />
    ))}
  </div>
);

export default SearchResultsList;