import TopListColumn from "./TopListColumn";
import { getTopRated } from "../../api/musical-entity";
import { useFetch } from "../../hooks/useFetch";
import "./TopLists.css";

const TopLists = () => {
  const { data: topRated, loading, error } = useFetch(getTopRated);

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
            items={topRated?.artists ?? []}
          />
          <TopListColumn
            title="Álbumes mejor puntuados"
            items={topRated?.albums ?? []}
          />
          <TopListColumn
            title="Canciones mejor puntuadas"
            items={topRated?.tracks ?? []}
          />
        </div>
      )}
    </>
  );
};

export default TopLists;