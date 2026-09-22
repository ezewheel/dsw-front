import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import "./Footer.css";

function Footer() {
  const { user } = useAuth();
  const { openLogin } = useAuthModals();

  const handleAdvancedSearch = () => {
    const searchInput = document.getElementById("navbar-search-input");
    if (searchInput) searchInput.focus();
  };

  return (
    <footer className="app-footer">
      <div className="app-footer-inner app-container">
        <div className="app-footer-brand">
          <Link to="/" className="app-footer-logo">
            <img src="/images/logo-white.webp" alt="BeatGround" />
          </Link>
          <p className="app-footer-tagline">
            Descubre, escucha y comparte la música que amas.
          </p>
        </div>

        <nav className="app-footer-links" aria-label="Enlaces rápidos">
          <p className="app-footer-heading">Explorar</p>
          <Link to="/">Inicio</Link>
          <button
            type="button"
            className="app-footer-link-btn"
            onClick={handleAdvancedSearch}
          >
            Búsqueda avanzada
          </button>
          {user ? (
            <Link to="/profile">Mi perfil</Link>
          ) : (
            <button
              type="button"
              className="app-footer-link-btn"
              onClick={openLogin}
            >
              Iniciar sesión
            </button>
          )}
        </nav>

        <nav className="app-footer-links" aria-label="Redes sociales">
          <p className="app-footer-heading">Síguenos</p>
          <div className="app-footer-social">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </nav>
      </div>

      <div className="app-footer-bottom">
        <div className="app-container">
          <p>© {new Date().getFullYear()} BeatGround. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;