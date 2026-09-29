import { useState, type FormEvent } from "react";
import { FaIdCard } from "react-icons/fa";
import type { User } from "../../../../api/auth";
import { getErrorMessage } from "../../../../api/client";
import { useAuth } from "../../../../context/auth-context";
import NicknameInput from "../../../../components/nicknameInput/NicknameInput";

const ProfileForm = ({ user }: { user: User }) => {
  const { updateProfile } = useAuth();

  const [nickname, setNickname] = useState(user.nickname);
  const [validated, setValidated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const normalizedNickname = nickname.trim();
  const hasChanges = normalizedNickname !== user.nickname;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!event.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    setPending(true);

    try {
      await updateProfile({ nickname: normalizedNickname });
      setNickname(normalizedNickname);
      setValidated(false);
      setNotice("Datos actualizados.");
    } catch (updateError) {
      setError(
        getErrorMessage(
          updateError,
          "No se pudieron guardar tus datos. Intentalo de nuevo.",
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
        <FaIdCard className="profile-panel-icon" aria-hidden="true" />
        <div>
          <h2 className="profile-panel-title">Tus datos</h2>
          <p className="profile-panel-hint">
            Tu nickname es público; tu email solo lo ves vos.
          </p>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="profile-nickname">
          Nickname
        </label>
        <NicknameInput
          id="profile-nickname"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="profile-email">
          Email
        </label>
        <input
          id="profile-email"
          type="email"
          className="form-input"
          value={user.email}
          disabled
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

      <div className="profile-panel-actions">
        <button
          type="submit"
          className="app-btn app-btn-primary"
          disabled={pending || !hasChanges}
        >
          {pending ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
