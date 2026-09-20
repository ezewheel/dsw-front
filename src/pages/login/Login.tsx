import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login({ email, password });
      navigate("/");
    } catch {
      setError("Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>
        <p className="auth-subtitle">Ingresá a tu cuenta para continuar</p>
        <form
          noValidate
          onSubmit={handleSubmit}
          className={`auth-form${validated ? " was-validated" : ""}`}
        >
          <div className="form-field">
            <label className="form-label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              className="form-input"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="form-feedback">Ingresá un email válido.</p>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="login-password">
              Contraseña
            </label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <p className="form-feedback">
              La contraseña debe tener al menos 6 caracteres.
            </p>
          </div>

          <label className="checkbox-field">
            <input type="checkbox" />
            Recordarme
          </label>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="app-btn app-btn-primary app-btn-block"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="auth-alt">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="auth-link">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;