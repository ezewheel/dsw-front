import TopListColumn from "./TopListColumn";
import { topAlbums, topArtists, topSongs } from "./topData";
import "./TopLists.css";

const TopLists = () => {
  return (
    <>
      <h3 className="text-center top-lists-title">Listas de popularidad</h3>
      <div className="top-lists">
        <TopListColumn
          title="Artistas mejor puntuados"
          entries={topArtists}
          imageAlt={(e) => `Imagen de ${e.name}`}
        />
        <TopListColumn
          title="Álbumes mejor puntuados"
          entries={topAlbums}
          imageAlt={(e) => `Portada de ${e.name}`}
        />
        <TopListColumn
          title="Canciones mejor puntuadas"
          entries={topSongs}
          imageAlt={(e) => `Portada de ${e.name}`}
        />
      </div>
    </>
  );
};

export default TopLists;
