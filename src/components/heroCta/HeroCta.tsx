import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import "./HeroCta.css";

const HeroCta = () => {
  const { user } = useAuth();

  return (
    <>
      {!user && (
        <>
          <p className="tagline text-center mt-4">
            La mejor red social para los amantes de la música
          </p>
          <div className="text-center mt-4 mb-2">
            <Link
              to="/register"
              className="btn btn-success btn-lg register-cta"
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
