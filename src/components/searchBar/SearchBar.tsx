import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { searchMusicalEntity } from "../../api/musical-entity";
import { searchUsers } from "../../api/user";
import { entityPath, searchPath, userPath } from "../../utils/routes";
import type { SearchType } from "../../utils/search";
import SearchTypeMenu from "../searchTypeMenu/SearchTypeMenu";
import "./SearchBar.css";

const SEARCH_LIMIT = 10;

type SearchBarResult = {
  key: string;
  path: string;
  image: string | null;
  title: string;
  meta: string;
};

const searchResults = async (
  query: string,
  type: SearchType,
): Promise<SearchBarResult[]> => {
  if (type === "user") {
    const { results } = await searchUsers(query, { limit: SEARCH_LIMIT });
    return results.map((user) => ({
      key: `user-${user.id}`,
      path: userPath(user.id),
      image: null,
      title: user.nickname,
      meta: "Usuario",
    }));
  }

  const { results } = await searchMusicalEntity(query, type, {
    limit: SEARCH_LIMIT,
  });
  return results.map((entity) => ({
    key: `${entity.type}-${entity.externalId}`,
    path: entityPath(entity.type, entity.externalId),
    image: entity.cover,
    title: entity.title ?? "Contenido no disponible",
    meta: entity.artist ?? "Artista",
  }));
};

function SearchBar() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<SearchType>("track");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchBarResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const blurTimer = useRef<number | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) return;

    let active = true;

    const timer = window.setTimeout(() => {
      setLoading(true);
      searchResults(trimmed, searchType)
        .then((found) => {
          if (!active) return;
          setResults(found);
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
    navigate(searchPath(trimmed, searchType));
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
        <SearchTypeMenu value={searchType} onChange={setSearchType} />

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
                    key={result.key}
                    to={result.path}
                    className="searchbar-result"
                    onClick={() => setOpen(false)}
                  >
                    {result.image ? (
                      <img
                        src={result.image}
                        alt={`Portada de ${result.title}`}
                      />
                    ) : (
                      <span
                        className="searchbar-result-avatar"
                        aria-hidden="true"
                      >
                        {result.title.charAt(0).toUpperCase()}
                      </span>
                    )}
                    <div className="searchbar-result-info">
                      <div className="searchbar-result-title">
                        {result.title}
                      </div>
                      <div className="searchbar-result-meta">{result.meta}</div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                to={searchPath(query.trim(), searchType)}
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
