import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import {
  searchMusicalEntity,
  type SearchApiType,
  type SearchResult,
} from "../../../services/search.service";
import "./SearchBar.css";

type LocalSearchType = "song" | "album" | "artist";

const SEARCH_TYPES: { value: LocalSearchType; label: string }[] = [
  { value: "song", label: "Canción" },
  { value: "album", label: "Álbum" },
  { value: "artist", label: "Artista" },
];

const API_TYPE: Record<LocalSearchType, SearchApiType> = {
  song: "track",
  album: "album",
  artist: "artist",
};

const resultTitle = (result: SearchResult): string => {
  return "title" in result ? result.title : result.name;
};

const resultSubtitle = (result: SearchResult): string => {
  return "artist" in result ? (result.artist?.name ?? "") : "Artista";
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

const resultKey = (result: SearchResult): string =>
  `${result.type}-${result.externalId}`;

function SearchBar() {
  const [searchType, setSearchType] = useState<LocalSearchType>("song");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const blurTimer = useRef<number | null>(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) return;

    let active = true;

    const timer = window.setTimeout(() => {
      setLoading(true);
      searchMusicalEntity(trimmed, API_TYPE[searchType])
        .then((items) => {
          if (!active) return;
          setResults(items.slice(0, 5));
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
          onChange={(e) => setSearchType(e.target.value as LocalSearchType)}
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
            results.map((result) => (
<Link
                  key={resultKey(result)}
                  to={resultRoute(result)}
                  className="searchbar-result"
                  onClick={() => setOpen(false)}
                >
                  {resultImage(result) && (
                    <img
                      src={resultImage(result)}
                      alt={`Portada de ${resultTitle(result)}`}
                    />
                  )}
                  <div className="searchbar-result-info">
                    <div className="searchbar-result-title">
                      {resultTitle(result)}
                    </div>
                    <div className="searchbar-result-meta">
                      {resultSubtitle(result)}
                    </div>
                  </div>
                </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;