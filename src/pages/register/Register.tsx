import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() && acceptedTerms) {
      navigate("/");
    } else {
      setValidated(true);
    }
  };

  return (
    <div className="app-container auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Registrarse</h2>
        <p className="auth-subtitle">Creá tu cuenta gratuita</p>
        <form
          noValidate
          onSubmit={handleSubmit}
          className={`auth-form${validated ? " was-validated" : ""}`}
        >
          <div className="auth-row">
            <div className="form-field auth-field">
              <label className="form-label" htmlFor="register-name">
                Nombre
              </label>
              <input
                id="register-name"
                className="form-input"
                placeholder="Juan"
                required
              />
              <p className="form-feedback">Ingresá tu nombre.</p>
            </div>

            <div className="form-field auth-field">
              <label className="form-label" htmlFor="register-lastname">
                Apellido
              </label>
              <input
                id="register-lastname"
                className="form-input"
                placeholder="Pérez"
                required
              />
              <p className="form-feedback">Ingresá tu apellido.</p>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              className="form-input"
              placeholder="tu@email.com"
              required
            />
            <p className="form-feedback">Ingresá un email válido.</p>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="register-password">
              Contraseña
            </label>
            <input
              id="register-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <p className="form-feedback">
              La contraseña debe tener al menos 6 caracteres.
            </p>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="register-confirm-password">
              Confirmar contraseña
            </label>
            <input
              id="register-confirm-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
            />
            <p className="form-feedback">Confirmá tu contraseña.</p>
          </div>

          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            Acepto los términos y condiciones
          </label>
          {validated && !acceptedTerms && (
            <p className="form-feedback form-feedback-visible">
              Debes aceptar los términos y condiciones.
            </p>
          )}

          <button type="submit" className="app-btn app-btn-primary app-btn-block">
            Crear cuenta
          </button>
        </form>

        <p className="auth-alt">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="auth-link">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;