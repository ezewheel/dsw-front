import { useState, type FormEvent } from "react";
import { getErrorMessage, isNicknameTaken } from "../../api/client";
import { useAuth } from "../../context/auth-context";
import { useAuthModals } from "../authModals/auth-modals-context";
import NicknameInput, {
  NICKNAME_TAKEN_MESSAGE,
} from "../nicknameInput/NicknameInput";
import PasswordInput from "../passwordInput/PasswordInput";
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
  const [nicknameError, setNicknameError] = useState("");
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
    setNicknameError("");

    try {
      await register({ email, password, nickname });
      onClose();
    } catch (registerError) {
      if (isNicknameTaken(registerError)) {
        setNicknameError(NICKNAME_TAKEN_MESSAGE);
      } else {
        setError(
          getErrorMessage(
            registerError,
            "No se pudo crear la cuenta. Intentalo de nuevo.",
          ),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    if (nicknameError) setNicknameError("");
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
          <NicknameInput
            id="register-modal-nickname"
            placeholder="usuario123"
            value={nickname}
            onChange={(event) => handleNicknameChange(event.target.value)}
            error={nicknameError}
          />
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
            enforceMinLength
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
          className="auth-link"
          onClick={openLogin}
        >
          Iniciá sesión
        </button>
      </p>
    </Modal>
  );
};

export default RegisterModal;
