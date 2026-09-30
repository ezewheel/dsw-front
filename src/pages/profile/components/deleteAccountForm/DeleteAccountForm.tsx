import { useState, type FormEvent } from "react";
import { FaUserTimes } from "react-icons/fa";
import { getErrorMessage } from "../../../../api/client";
import { deleteAccount } from "../../../../api/user";
import { useAuth } from "../../../../context/auth-context";
import Modal from "../../../../components/modal/Modal";
import PasswordInput from "../../../../components/passwordInput/PasswordInput";
import "./DeleteAccountForm.css";

const DeleteAccountForm = () => {
  const { logout } = useAuth();
  const [confirming, setConfirming] = useState(false);
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const closeModal = () => {
    setConfirming(false);
    setPassword("");
    setValidated(false);
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    setPending(true);

    try {
      await deleteAccount(password);
      logout();
    } catch (deleteError) {
      setError(
        getErrorMessage(
          deleteError,
          "No se pudo eliminar tu cuenta. Intentalo de nuevo.",
        ),
      );
      setPending(false);
    }
  };

  return (
    <div className="profile-panel">
      <div className="profile-panel-header">
        <FaUserTimes className="profile-panel-icon" aria-hidden="true" />
        <div>
          <h2 className="profile-panel-title">Eliminar cuenta</h2>
          <p className="profile-panel-hint">
            Se borran tu cuenta y todas tus reseñas. No se puede deshacer.
          </p>
        </div>
      </div>

      <div className="profile-panel-actions">
        <button
          type="button"
          className="app-btn app-btn-danger"
          onClick={() => setConfirming(true)}
        >
          Eliminar cuenta
        </button>
      </div>

      {confirming && (
        <Modal title="Eliminar cuenta" onClose={closeModal}>
          <form
            noValidate
            onSubmit={handleSubmit}
            className={`delete-account-form${validated ? " was-validated" : ""}`}
          >
            <p className="delete-account-text">
              Se van a borrar tu cuenta y todas tus reseñas. Para confirmar,
              ingresá tu contraseña.
            </p>
            <div className="form-field">
              <label className="form-label" htmlFor="delete-account-password">
                Contraseña
              </label>
              <PasswordInput
                id="delete-account-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                feedback="Ingresá tu contraseña."
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="delete-account-actions">
              <button
                type="button"
                className="app-btn app-btn-secondary"
                onClick={closeModal}
                disabled={pending}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="app-btn app-btn-danger"
                disabled={pending}
              >
                {pending ? "Eliminando..." : "Eliminar cuenta"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default DeleteAccountForm;
