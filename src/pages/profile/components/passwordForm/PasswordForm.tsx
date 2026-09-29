import { useState, type FormEvent } from "react";
import { getErrorMessage } from "../../../../api/client";
import { changePassword } from "../../../../api/user";
import PasswordInput from "../../../../components/passwordInput/PasswordInput";

const MIN_PASSWORD_LENGTH = 8;

const PasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidated(true);
      setError("Las contraseñas no coinciden.");
      return;
    }

    setPending(true);

    try {
      await changePassword({ currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setValidated(false);
      setNotice("Contraseña actualizada.");
    } catch (changeError) {
      setError(
        getErrorMessage(
          changeError,
          "No se pudo cambiar la contraseña. Intentalo de nuevo.",
        ),
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={`profile-card profile-form${validated ? " was-validated" : ""}`}
    >
      <h2 className="profile-section-title">Contraseña</h2>

      <div className="form-field">
        <label className="form-label" htmlFor="profile-current-password">
          Contraseña actual
        </label>
        <PasswordInput
          id="profile-current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
          feedback="Ingresá tu contraseña actual."
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="profile-new-password">
          Contraseña nueva
        </label>
        <PasswordInput
          id="profile-new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required
          minLength={MIN_PASSWORD_LENGTH}
          feedback="La contraseña debe tener al menos 8 caracteres."
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="profile-confirm-password">
          Confirmar contraseña nueva
        </label>
        <PasswordInput
          id="profile-confirm-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          minLength={MIN_PASSWORD_LENGTH}
          feedback="Confirmá tu contraseña nueva."
        />
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {notice && (
        <div className="alert alert-success" role="status">
          {notice}
        </div>
      )}

      <button
        type="submit"
        className="app-btn app-btn-primary"
        disabled={pending}
      >
        {pending ? "Cambiando..." : "Cambiar contraseña"}
      </button>
    </form>
  );
};

export default PasswordForm;
