import { useState, type FormEvent } from "react";
import { getErrorMessage } from "../../api/client";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import PasswordInput from "../authModals/PasswordInput";
import Modal from "../modal/Modal";
import "../authModals/auth-form.css";

const RegisterModal = ({ onClose }: { onClose: () => void }) => {
  const { register } = useAuth();
  const { openLogin } = useAuthModals();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
      onClose();
    } catch (registerError) {
      setError(
        getErrorMessage(
          registerError,
          "No se pudo crear la cuenta. Inténtalo de nuevo.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Creá tu cuenta en BeatGround" onClose={onClose}>
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
          <PasswordInput
            id="register-modal-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
            minLength={8}
            feedback="La contraseña debe tener al menos 8 caracteres."
          />
        </div>

        <div className="form-field">
          <label
            className="form-label"
            htmlFor="register-modal-confirm-password"
          >
            Confirmar contraseña
          </label>
          <PasswordInput
            id="register-modal-confirm-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="••••••••"
            required
            minLength={8}
            feedback="Confirmá tu contraseña."
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
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="auth-alt">
        ¿Ya tenés cuenta?{" "}
        <button
          type="button"
          className="auth-link auth-link-btn"
          onClick={openLogin}
        >
          Iniciá sesión
        </button>
      </p>
    </Modal>
  );
};

export default RegisterModal;
