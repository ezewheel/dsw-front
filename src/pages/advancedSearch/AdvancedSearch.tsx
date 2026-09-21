import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import {
  searchMusicalEntity,
  type SearchApiType,
  type SearchResult,
} from "../../services/search.service";
import SearchResultItem from "../../components/searchResultItem/SearchResultItem";
import Pagination from "../../components/pagination/Pagination";
import "./AdvancedSearch.css";

const TYPE_LABELS: Record<SearchApiType, string> = {
  track: "canción",
  album: "álbum",
  artist: "artista",
};

const PAGE_SIZE = 10;

const toApiType = (type: string | null): SearchApiType | null => {
  if (type === "track" || type === "album" || type === "artist") return type;
  if (type === "song") return "track";
  return null;
};

const AdvancedSearch = () => {
  const [params] = useSearchParams();
  const query = params.get("query") ?? "";
  const rawType = params.get("type");
  const apiType = toApiType(rawType);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Nueva búsqueda (cambia query o tipo) siempre arranca en la página 1.
  useEffect(() => {
    setPage(1);
  }, [query, apiType]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || !apiType) return;

    let active = true;

    const fetchResults = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await searchMusicalEntity(trimmed, apiType, {
          limit: PAGE_SIZE,
          index: (page - 1) * PAGE_SIZE,
        });
        if (!active) return;
        setResults(response.results);
        setTotal(response.total);
      } catch {
        if (!active) return;
        setError("No se pudieron cargar los resultados");
        setResults([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchResults();

    return () => {
      active = false;
    };
  }, [query, apiType, page]);

  const hasQuery = query.trim() !== "" && apiType !== null;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="app-container advanced-search">
      <h1 className="advanced-search-heading">
        {hasQuery ? (
          <>
            Resultados para{" "}
            <span className="advanced-search-keyword">"{query.trim()}"</span> en{" "}
            {TYPE_LABELS[apiType]}
          </>
        ) : (
          "Buscá canciones, álbumes y artistas."
        )}
      </h1>

      {!loading && !error && hasQuery && total > 0 && (
        <p className="advanced-search-count">Mostrando {total} resultados</p>
      )}

      {loading && (
        <div className="advanced-search-status">
          <FaSpinner className="advanced-search-spinner" aria-hidden="true" />
          Buscando...
        </div>
      )}

      {!loading && error && (
        <div className="advanced-search-status">{error}</div>
      )}

      {!loading && !error && hasQuery && results.length === 0 && (
        <div className="advanced-search-status">Sin resultados</div>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <div className="advanced-search-list">
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
  );
};

export default AdvancedSearch;
