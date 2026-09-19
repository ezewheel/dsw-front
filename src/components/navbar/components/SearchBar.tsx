import { CiSearch } from "react-icons/ci";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="searchbar">
      <CiSearch className="searchbar-icon" size={20} />
      <input
        type="text"
        placeholder="Buscar artistas, albumes o canciones..."
        className="searchbar-input"
      />
    </div>
  );
}

export default SearchBar;
