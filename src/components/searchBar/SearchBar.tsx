import {
  useEffect,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
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

type FoundResults = {
  search: string;
  results: SearchBarResult[];
};

const searchKey = (query: string, type: SearchType) => `${type}:${query}`;

function SearchBar() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<SearchType>("track");
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<FoundResults | null>(null);
  const [open, setOpen] = useState(false);

  const trimmedQuery = query.trim();
  const currentSearch = searchKey(trimmedQuery, searchType);
  const results = found?.search === currentSearch ? found.results : null;

  useEffect(() => {
    if (!trimmedQuery) return;

    let active = true;
    const search = searchKey(trimmedQuery, searchType);

    const timer = window.setTimeout(() => {
      searchResults(trimmedQuery, searchType)
        .then((items) => {
          if (!active) return;
          setFound({ search, results: items });
          setOpen(true);
        })
        .catch(() => {
          if (!active) return;
          setFound({ search, results: [] });
          setOpen(false);
        });
    }, 300);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [trimmedQuery, searchType]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trimmedQuery) return;
    setOpen(false);
    navigate(searchPath(trimmedQuery, searchType));
  }

  function handleFocus() {
    if (trimmedQuery) setOpen(true);
  }

  function keepInputFocused(event: MouseEvent) {
    event.preventDefault();
  }

  return (
    <div className="searchbar-wrapper">
      <form className="searchbar" onSubmit={handleSubmit}>
        <SearchTypeMenu value={searchType} onChange={setSearchType} />

        <input
          type="text"
          placeholder="Buscar..."
          className="searchbar-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={handleFocus}
          onBlur={() => setOpen(false)}
        />

        <button type="submit" className="searchbar-icon" aria-label="Buscar">
          <CiSearch size={20} />
        </button>
      </form>

      {open && trimmedQuery && (
        <div className="searchbar-results" onMouseDown={keepInputFocused}>
          {results === null ? (
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
                to={searchPath(trimmedQuery, searchType)}
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
