import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import {
  searchMusicalEntity,
  type EntitySummary,
} from "../../api/musical-entity";
import { searchUsers, type UserSummary } from "../../api/users";
import SearchResultItem from "./components/searchResultItem/SearchResultItem";
import UserResultItem from "./components/userResultItem/UserResultItem";
import Pagination from "../../components/pagination/Pagination";
import { useFetch } from "../../hooks/useFetch";
import { formatCount } from "../../utils/format";
import {
  isSearchType,
  SEARCH_TYPES,
  type SearchType,
} from "../../utils/search";
import "./SearchPage.css";

const PAGE_SIZE = 20;

type SearchPageResults =
  | { type: "user"; results: UserSummary[]; total: number }
  | { type: "entity"; results: EntitySummary[]; total: number };

const toPage = (value: string | null): number =>
  Math.max(1, Number.parseInt(value ?? "", 10) || 1);

const SearchPage = () => {
  const [params, setSearchParams] = useSearchParams();
  const query = params.get("query") ?? "";
  const typeParam = params.get("type");
  const searchType = isSearchType(typeParam) ? typeParam : null;
  const page = toPage(params.get("page"));

  const { data, loading, error } = useFetch(
    useCallback(async (): Promise<SearchPageResults | null> => {
      const trimmed = query.trim();
      if (!trimmed || !searchType) return null;

      const options = { limit: PAGE_SIZE, index: (page - 1) * PAGE_SIZE };

      if (searchType === "user") {
        return { type: "user", ...(await searchUsers(trimmed, options)) };
      }

      return {
        type: "entity",
        ...(await searchMusicalEntity(trimmed, searchType, options)),
      };
    }, [query, searchType, page]),
  );

  const total = data?.total ?? 0;
  const hasResults = (data?.results.length ?? 0) > 0;
  const hasQuery = query.trim() !== "" && searchType !== null;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const selectType = (type: SearchType) => {
    if (type === searchType) return;
    setSearchParams({ query, type });
  };

  const setPage = (nextPage: number) => {
    setSearchParams((current) => {
      current.set("page", String(nextPage));
      return current;
    });
  };

  return (
    <div className="app-container search-page">
      <h1 className="search-page-heading">
        {hasQuery ? (
          <>
            Resultados para{" "}
            <span className="search-page-keyword">"{query.trim()}"</span> en{" "}
            {SEARCH_TYPES[searchType].pluralLabel.toLowerCase()}
          </>
        ) : (
          "Buscá canciones, álbumes, artistas y usuarios."
        )}
      </h1>
      {!loading && !error && hasQuery && total > 0 && (
        <p className="search-page-count">
          Mostrando {formatCount(total, "resultado", "resultados")}
        </p>
      )}
      <div className="search-page-layout">
        <div className="search-page-main">
          {loading && (
            <div className="status-message">
              <FaSpinner
                className="search-page-spinner"
                aria-hidden="true"
              />
              Buscando...
            </div>
          )}

          {!loading && error && (
            <div className="status-message">
              No se pudieron cargar los resultados
            </div>
          )}

          {!loading && !error && hasQuery && !hasResults && (
            <div className="status-message">Sin resultados</div>
          )}

          {!loading && !error && data && hasResults && (
            <>
              <div className="search-page-results" role="list">
                {data.type === "user"
                  ? data.results.map((user) => (
                      <UserResultItem key={user.id} user={user} />
                    ))
                  : data.results.map((result) => (
                      <SearchResultItem
                        key={`${result.type}-${result.externalId}`}
                        result={result}
                      />
                    ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>

        <aside className="search-page-filters">
          <h2 className="search-page-filters-title">Filtrar por tipo</h2>
          <div
            className="search-page-type-selector"
            role="radiogroup"
            aria-label="Tipo de resultado"
          >
            {(Object.keys(SEARCH_TYPES) as SearchType[]).map((type) => {
              const { pluralLabel, icon: Icon } = SEARCH_TYPES[type];
              return (
                <label
                  key={type}
                  className={`search-page-type-option${
                    searchType === type ? " is-active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="search-page-type"
                    value={type}
                    checked={searchType === type}
                    onChange={() => selectType(type)}
                  />
                  <Icon
                    className="search-page-type-icon"
                    aria-hidden="true"
                  />
                  {pluralLabel}
                </label>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SearchPage;
