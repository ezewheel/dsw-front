import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/auth-context";
import SearchBar from "./components/SearchBar";
import "./NavBar.css";

function NavBar() {
  const { user } = useAuth();

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
          {user ? (
            <Link to="/profile" className="app-navbar-link">
              <FaUserCircle className="app-navbar-user-icon" />
            </Link>
          ) : (
            <>
              <Link to="/login" className="app-navbar-link">
                Iniciar sesión
              </Link>
              <Link to="/register" className="app-navbar-link">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
