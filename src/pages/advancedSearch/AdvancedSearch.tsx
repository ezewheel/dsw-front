import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCompactDisc, FaMusic, FaSpinner, FaUser } from "react-icons/fa";
import {
  ENTITY_TYPE_LABELS,
  searchMusicalEntity,
  type MusicalEntityType,
} from "../../api/musical-entity";
import SearchResultItem from "../../components/searchResultItem/SearchResultItem";
import Pagination from "../../components/pagination/Pagination";
import { useFetch } from "../../hooks/useFetch";
import { formatCount } from "../../utils/format";
import "./AdvancedSearch.css";

const TYPE_OPTIONS: Record<MusicalEntityType, string> = {
  track: "Canciones",
  album: "Álbumes",
  artist: "Artistas",
};

const TYPE_ICONS: Record<MusicalEntityType, typeof FaMusic> = {
  track: FaMusic,
  album: FaCompactDisc,
  artist: FaUser,
};

const PAGE_SIZE = 20;

const toApiType = (type: string | null): MusicalEntityType | null => {
  if (type === "track" || type === "album" || type === "artist") return type;
  if (type === "song") return "track";
  return null;
};

const AdvancedSearch = () => {
  const [params, setSearchParams] = useSearchParams();
  const query = params.get("query") ?? "";
  const rawType = params.get("type");
  const apiType = toApiType(rawType);

  const [page, setPage] = useState(1);

  const searchKey = `${apiType}:${query.trim()}`;
  const [appliedSearchKey, setAppliedSearchKey] = useState(searchKey);
  if (appliedSearchKey !== searchKey) {
    setAppliedSearchKey(searchKey);
    setPage(1);
  }

  const { data, loading, error } = useFetch(
    useCallback(async () => {
      const trimmed = query.trim();
      if (!trimmed || !apiType) return null;

      return searchMusicalEntity(trimmed, apiType, {
        limit: PAGE_SIZE,
        index: (page - 1) * PAGE_SIZE,
      });
    }, [query, apiType, page]),
  );

  const results = data?.results ?? [];
  const total = data?.total ?? 0;
  const hasQuery = query.trim() !== "" && apiType !== null;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const selectType = (type: MusicalEntityType) => {
    if (type === apiType) return;
    setSearchParams({ query, type });
  };

  return (
    <div className="app-container advanced-search">
      <h1 className="advanced-search-heading">
        {hasQuery ? (
          <>
            Resultados para{" "}
            <span className="advanced-search-keyword">"{query.trim()}"</span> en{" "}
            {ENTITY_TYPE_LABELS[apiType]}
          </>
        ) : (
          "Buscá canciones, álbumes y artistas."
        )}
      </h1>
      {!loading && !error && hasQuery && total > 0 && (
        <p className="advanced-search-count">
          Mostrando {formatCount(total, "resultado", "resultados")}
        </p>
      )}
      <div className="advanced-search-layout">
        <div className="advanced-search-main">
          {loading && (
            <div className="advanced-search-status">
              <FaSpinner
                className="advanced-search-spinner"
                aria-hidden="true"
              />
              Buscando...
            </div>
          )}

          {!loading && error && (
            <div className="advanced-search-status">
              No se pudieron cargar los resultados
            </div>
          )}

          {!loading && !error && hasQuery && results.length === 0 && (
            <div className="advanced-search-status">Sin resultados</div>
          )}

          {!loading && !error && results.length > 0 && (
            <>
              <div className="advanced-search-results" role="list">
                {results.map((result) => (
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

        {!loading && !error && (
          <aside className="advanced-search-filters">
            <h2 className="advanced-search-filters-title">Filtrar por tipo</h2>
            <div
              className="advanced-search-type-selector"
              role="radiogroup"
              aria-label="Tipo de resultado"
            >
              {(Object.keys(TYPE_OPTIONS) as MusicalEntityType[]).map((type) => {
                const Icon = TYPE_ICONS[type];
                return (
                  <label
                    key={type}
                    className={`advanced-search-type-option${
                      apiType === type ? " is-active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="advanced-search-type"
                      value={type}
                      checked={apiType === type}
                      onChange={() => selectType(type)}
                    />
                    <Icon
                      className="advanced-search-type-icon"
                      aria-hidden="true"
                    />
                    {TYPE_OPTIONS[type]}
                  </label>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
