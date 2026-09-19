import { Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import "./NavBar.css";

function Navbar() {
  return (
    <nav className="app-navbar">
      <div className="app-navbar-inner">
        <div className="app-navbar-brand">
          <img src="/images/logo-white.webp" alt="BeatGround" />
        </div>

        <div className="app-navbar-center">
          <SearchBar />
        </div>

        <div className="app-navbar-links">
          <Link to="/login" className="app-navbar-link">
            Iniciar sesión
          </Link>
          <Link to="/register" className="app-navbar-link">
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
