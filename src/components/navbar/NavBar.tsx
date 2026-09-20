import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/auth-context";
import SearchBar from "./components/SearchBar";
import LoginModal from "../loginModal/LoginModal";
import "./NavBar.css";

function NavBar() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

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
                onClick={() => setShowLogin(true)}
              >
                Iniciar sesión
              </button>
              <Link to="/register" className="app-navbar-link">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>

      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
    </nav>
  );
}

export default NavBar;
