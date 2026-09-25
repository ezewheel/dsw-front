import { useEffect, useState, type FormEvent } from "react";
import { getErrorMessage } from "../../api/client";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import PasswordInput from "../authModals/PasswordInput";
import "./LoginModal.css";

type LoginModalProps = { show: boolean; onHide: () => void };

const LoginModal = ({ show, onHide }: LoginModalProps) => {
  const { login } = useAuth();
  const { openRegister } = useAuthModals();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onHide();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [show, onHide]);

  if (!show) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      onHide();
    } catch (loginError) {
      setError(
        getErrorMessage(
          loginError,
          "No se pudo iniciar sesión. Intentalo de nuevo.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onHide}>
      <div
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="login-modal-header">
          <h2 id="login-modal-title" className="login-modal-title">
            Iniciá sesión en BeatGround
          </h2>
          <button
            type="button"
            className="login-modal-close"
            aria-label="Cerrar"
            onClick={onHide}
          >
            ×
          </button>
        </div>

        <div className="login-modal-body">
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
                onChange={(event) => setEmail(event.target.value)}
                autoFocus
                required
              />
              <p className="form-feedback">Ingresá un email válido.</p>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="login-password">
                Contraseña
              </label>
              <PasswordInput
                id="login-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                feedback="La contraseña debe tener al menos 8 caracteres."
              />
            </div>

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
            <button
              type="button"
              className="auth-link auth-link-btn"
              onClick={() => {
                onHide();
                openRegister();
              }}
            >
              Registrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
