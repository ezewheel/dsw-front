import { useState, type FormEvent } from "react";
import { FaLock } from "react-icons/fa";
import { getErrorMessage } from "../../../../api/client";
import { changePassword } from "../../../../api/user";
import PasswordInput from "../../../../components/passwordInput/PasswordInput";

const PasswordForm = () => {
  const [editing, setEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const startEditing = () => {
    setNotice("");
    setEditing(true);
  };

  const stopEditing = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setValidated(false);
    setError("");
    setEditing(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setValidated(true);
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }

    setPending(true);

    try {
      await changePassword({ currentPassword, newPassword });
      stopEditing();
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
      className={`profile-panel${validated ? " was-validated" : ""}`}
    >
      <div className="profile-panel-header">
        <FaLock className="profile-panel-icon" aria-hidden="true" />
        <div>
          <h2 className="profile-panel-title">Contraseña</h2>
          <p className="profile-panel-hint">
            {editing
              ? "Confirmá tu contraseña actual y elegí una nueva."
              : "Te vamos a pedir tu contraseña actual para cambiarla."}
          </p>
        </div>
      </div>

      {editing && (
        <>
          <div className="form-field">
            <label className="form-label" htmlFor="profile-current-password">
              Contraseña actual
            </label>
            <PasswordInput
              id="profile-current-password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
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
              enforceMinLength
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="profile-confirm-password">
              Repetí la contraseña nueva
            </label>
            <PasswordInput
              id="profile-confirm-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              feedback="Repetí tu contraseña nueva."
            />
          </div>
        </>
      )}

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

      <div className="profile-panel-actions">
        {editing ? (
          <>
            <button
              type="submit"
              className="app-btn app-btn-primary"
              disabled={pending}
            >
              {pending ? "Guardando..." : "Guardar contraseña"}
            </button>
            <button
              type="button"
              className="app-btn app-btn-secondary"
              onClick={stopEditing}
              disabled={pending}
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            type="button"
            className="app-btn app-btn-secondary"
            onClick={startEditing}
          >
            Cambiar contraseña
          </button>
        )}
      </div>
    </form>
  );
};

export default PasswordForm;
