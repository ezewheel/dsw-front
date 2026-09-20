import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import "./RegisterModal.css";

type RegisterModalProps = { show: boolean; onHide: () => void };

const RegisterModal = ({ show, onHide }: RegisterModalProps) => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { openLogin } = useAuthModals();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setValidated(true);
      setError("Las contraseñas no coinciden.");
      return;
    }

    setValidated(true);
    setLoading(true);
    setError("");

    try {
      await register({ email, password, nickname });
      onHide();
      navigate("/");
    } catch (axiosError) {
      const message = (
        axiosError as { response?: { data?: { message?: string } } }
      ).response?.data?.message;
      setError(message ?? "No se pudo crear la cuenta. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    onHide();
    openLogin();
  };

  return (
    <div className="register-modal-overlay" onClick={onHide}>
      <div
        className="register-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="register-modal-header">
          <h2 id="register-modal-title" className="register-modal-title">
            Creá tu cuenta en BeatGround
          </h2>
          <button
            type="button"
            className="register-modal-close"
            aria-label="Cerrar"
            onClick={onHide}
          >
            ×
          </button>
        </div>

        <div className="register-modal-body">
          <form
            noValidate
            onSubmit={handleSubmit}
            className={`auth-form${validated ? " was-validated" : ""}`}
          >
            <div className="form-field">
              <label className="form-label" htmlFor="register-modal-nickname">
                Nickname
              </label>
              <input
                id="register-modal-nickname"
                type="text"
                className="form-input"
                placeholder="usuario123"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                autoFocus
                required
              />
              <p className="form-feedback">Ingresá un nickname.</p>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="register-modal-email">
                Email
              </label>
              <input
                id="register-modal-email"
                type="email"
                className="form-input"
                placeholder="tu@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <p className="form-feedback">Ingresá un email válido.</p>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="register-modal-password">
                Contraseña
              </label>
              <input
                id="register-modal-password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
              />
              <p className="form-feedback">
                La contraseña debe tener al menos 8 caracteres.
              </p>
            </div>

            <div className="form-field">
              <label
                className="form-label"
                htmlFor="register-modal-confirm-password"
              >
                Confirmar contraseña
              </label>
              <input
                id="register-modal-confirm-password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                minLength={8}
              />
              <p className="form-feedback">Confirmá tu contraseña.</p>
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
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <p className="auth-alt">
            ¿Ya tenés cuenta?{" "}
            <button
              type="button"
              className="auth-link auth-link-btn"
              onClick={switchToLogin}
            >
              Iniciá sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
