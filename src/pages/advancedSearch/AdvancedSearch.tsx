import { useSearchParams } from "react-router-dom";
import "./AdvancedSearch.css";

const AdvancedSearch = () => {
  const [params] = useSearchParams();
  const query = params.get("query");
  const type = params.get("type");

  return (
    <div className="app-container advanced-search">
      <h1 className="advanced-search-title">Búsqueda avanzada</h1>
      <p className="advanced-search-hint">
        {query
          ? `Resultados para "${query}"${type ? ` en ${type}` : ""}.`
          : "Buscá canciones, álbumes y artistas."}
      </p>
      <p className="advanced-search-placeholder">Próximamente...</p>
    </div>
  );
};

export default AdvancedSearch;