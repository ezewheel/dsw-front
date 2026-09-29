import { useState, type FormEvent } from "react";
import type { User } from "../../../../api/auth";
import { getErrorMessage } from "../../../../api/client";
import { useAuth } from "../../../../context/auth-context";

const ProfileForm = ({ user }: { user: User }) => {
  const { updateProfile } = useAuth();

  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [validated, setValidated] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const normalizedNickname = nickname.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const hasChanges =
    normalizedNickname !== user.nickname || normalizedEmail !== user.email;

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
      await updateProfile({
        nickname: normalizedNickname,
        email: normalizedEmail,
      });
      setNickname(normalizedNickname);
      setEmail(normalizedEmail);
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
      className={`profile-card profile-form${validated ? " was-validated" : ""}`}
    >
      <h2 className="profile-section-title">Tus datos</h2>

      <div className="form-field">
        <label className="form-label" htmlFor="profile-nickname">
          Nickname
        </label>
        <input
          id="profile-nickname"
          type="text"
          className="form-input"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          required
          pattern=".*\S.*"
        />
        <p className="form-feedback">Ingresá un nickname.</p>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="profile-email">
          Email
        </label>
        <input
          id="profile-email"
          type="email"
          className="form-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <p className="form-feedback">Ingresá un email válido.</p>
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
        disabled={pending || !hasChanges}
      >
        {pending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
};

export default ProfileForm;
