import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import SearchBar from "./components/SearchBar";
import "./NavBar.css";

function NavBar() {
  const { user, logout } = useAuth();
  const { openLogin, openRegister } = useAuthModals();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    navigate("/");
  };

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
            <div className="app-navbar-user" ref={dropdownRef}>
              <button
                type="button"
                className="app-navbar-link app-navbar-btn app-navbar-user-btn"
                aria-haspopup="menu"
                aria-expanded={showDropdown}
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <FaUserCircle className="app-navbar-user-icon" />
              </button>

              {showDropdown && (
                <div className="app-navbar-dropdown" role="menu">
                  <Link
                    to="/profile"
                    className="app-navbar-dropdown-item"
                    role="menuitem"
                    onClick={() => setShowDropdown(false)}
                  >
                    Mi perfil
                  </Link>
                  <button
                    type="button"
                    className="app-navbar-dropdown-item"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
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
