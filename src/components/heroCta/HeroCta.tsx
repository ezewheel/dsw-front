import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import "./HeroCta.css";

const HeroCta = () => {
  const { user } = useAuth();

  return (
    <>
      {!user && (
        <>
          <p className="tagline hero-cta-tagline">
            La mejor red social para los amantes de la música
          </p>
          <div className="text-center hero-cta-action">
            <Link
              to="/register"
              className="app-btn app-btn-success app-btn-lg register-cta"
            >
              ¡Registrate gratis ahora!
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default HeroCta;
