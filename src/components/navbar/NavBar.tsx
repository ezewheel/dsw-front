import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import SearchBar from "./components/SearchBar";
import "./NavBar.css";

function NavBar() {
  const { user } = useAuth();
  const { openLogin, openRegister } = useAuthModals();

  return (
    <nav className="app-navbar">
      <div className="app-navbar-inner">
        <Link to="/" className="app-navbar-brand">
          <img src="/images/logo-white.webp" alt="BeatGround" />
        </Link>

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
              <button
                type="button"
                className="app-navbar-link app-navbar-btn"
                onClick={openRegister}
              >
                Registrarse
              </button>
              <button
                type="button"
                className="app-navbar-link app-navbar-btn"
                onClick={openLogin}
              >
                Iniciar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
