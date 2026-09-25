import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import {
  searchMusicalEntity,
  type EntitySummary,
  type MusicalEntityType,
} from "../../../api/musical-entity";
import { entityPath } from "../../../utils/routes";
import "./SearchBar.css";

const SEARCH_TYPES: { value: MusicalEntityType; label: string }[] = [
  { value: "track", label: "Canción" },
  { value: "album", label: "Álbum" },
  { value: "artist", label: "Artista" },
];

const SEARCH_LIMIT = 10;

function SearchBar() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<MusicalEntityType>("track");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EntitySummary[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const blurTimer = useRef<number | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) return;

    let active = true;

    const timer = window.setTimeout(() => {
      setLoading(true);
      searchMusicalEntity(trimmed, searchType, { limit: SEARCH_LIMIT })
        .then((response) => {
          if (!active) return;
          setResults(response.results.slice(0, SEARCH_LIMIT));
          setOpen(true);
        })
        .catch(() => {
          if (!active) return;
          setResults([]);
          setOpen(false);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, 300);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [query, searchType]);

  useEffect(() => {
    return () => {
      if (blurTimer.current !== null) {
        window.clearTimeout(blurTimer.current);
      }
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setOpen(false);
    navigate(
      `/advanced-search?query=${encodeURIComponent(trimmed)}&type=${searchType}`,
    );
  }

  function handleFocus() {
    if (blurTimer.current !== null) {
      window.clearTimeout(blurTimer.current);
      blurTimer.current = null;
    }
    if (query.trim() !== "") setOpen(true);
  }

  function handleBlur() {
    blurTimer.current = window.setTimeout(() => setOpen(false), 150);
  }

  const hasQuery = query.trim() !== "";

  return (
    <div className="searchbar-wrapper">
      <form className="searchbar" onSubmit={handleSubmit}>
        <select
          className="searchbar-type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as MusicalEntityType)}
          aria-label="Tipo de búsqueda"
        >
          {SEARCH_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar..."
          className="searchbar-input"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (value.trim() === "") {
              setResults([]);
              setOpen(false);
            }
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <button type="submit" className="searchbar-icon" aria-label="Buscar">
          <CiSearch size={20} />
        </button>
      </form>

      {open && hasQuery && (
        <div className="searchbar-results">
          {loading && results.length === 0 ? (
            <div className="searchbar-results-empty">Buscando...</div>
          ) : results.length === 0 ? (
            <div className="searchbar-results-empty">Sin resultados</div>
          ) : (
            <>
              <div className="searchbar-results-list">
                {results.map((result) => (
                  <Link
                    key={result.externalId}
                    to={entityPath(result.type, result.externalId)}
                    className="searchbar-result"
                    onClick={() => setOpen(false)}
                  >
                    {result.cover && (
                      <img
                        src={result.cover}
                        alt={`Portada de ${result.title}`}
                      />
                    )}
                    <div className="searchbar-result-info">
                      <div className="searchbar-result-title">
                        {result.title}
                      </div>
                      <div className="searchbar-result-meta">
                        {result.artist ?? "Artista"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                to={`/advanced-search?query=${encodeURIComponent(
                  query.trim(),
                )}&type=${searchType}`}
                className="searchbar-more app-btn app-btn-primary app-btn-block"
                onClick={() => setOpen(false)}
              >
                Ver más
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
