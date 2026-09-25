import { useState, type FormEvent } from "react";
import { getErrorMessage } from "../../api/client";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import PasswordInput from "../authModals/PasswordInput";
import Modal from "../modal/Modal";
import "../authModals/auth-form.css";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  const { login } = useAuth();
  const { openRegister } = useAuthModals();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      onClose();
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
    <Modal title="Iniciá sesión en BeatGround" onClose={onClose}>
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
          onClick={openRegister}
        >
          Registrate
        </button>
      </p>
    </Modal>
  );
};

export default LoginModal;
