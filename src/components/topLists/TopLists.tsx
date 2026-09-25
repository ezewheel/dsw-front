import { useEffect, useState } from "react";
import TopListColumn, { type TopListEntry } from "./TopListColumn";
import { getTopRated, type TopRatedItem } from "../../services/top.service";
import { entityPath } from "../../utils/routes";
import "./TopLists.css";

const toEntry = (item: TopRatedItem): TopListEntry => ({
  name: item.title ?? "Contenido no disponible",
  imageUrl: item.cover ?? "",
  score: item.averageRating,
  to: entityPath(item.type, item.externalId),
});

const TopLists = () => {
  const [topRated, setTopRated] = useState<{
    artists: TopRatedItem[];
    albums: TopRatedItem[];
    tracks: TopRatedItem[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await getTopRated();
        if (!active) return;
        setTopRated(data);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <h2 className="text-center top-lists-title">Listas de popularidad</h2>

      {loading && <p className="top-lists-status">Cargando listas...</p>}

      {!loading && error && (
        <p className="top-lists-status">No se pudieron cargar las listas.</p>
      )}

      {!loading && !error && (
        <div className="top-lists">
          <TopListColumn
            title="Artistas mejor puntuados"
            entries={(topRated?.artists ?? []).map(toEntry)}
            imageAlt={(e) => `Imagen de ${e.name}`}
          />
          <TopListColumn
            title="Álbumes mejor puntuados"
            entries={(topRated?.albums ?? []).map(toEntry)}
            imageAlt={(e) => `Portada de ${e.name}`}
          />
          <TopListColumn
            title="Canciones mejor puntuadas"
            entries={(topRated?.tracks ?? []).map(toEntry)}
            imageAlt={(e) => `Portada de ${e.name}`}
          />
        </div>
      )}
    </>
  );
};

export default TopLists;