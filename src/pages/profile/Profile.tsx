import { useState } from "react";
import "../login/auth.css";

const Profile = () => {
  const [validated, setValidated] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setSaved(true);
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <div className="app-container auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Mi perfil</h2>
        <p className="auth-subtitle">Editá los datos de tu cuenta</p>
        {saved && (
          <div className="alert alert-success" role="alert">
            <span>Tus datos se guardaron correctamente.</span>
            <button
              type="button"
              className="alert-close"
              aria-label="Cerrar"
              onClick={() => setSaved(false)}
            >
              ×
            </button>
          </div>
        )}
        <form
          noValidate
          onSubmit={handleSubmit}
          className={`auth-form${validated ? " was-validated" : ""}`}
        >
          <div className="auth-row">
            <div className="form-field auth-field">
              <label className="form-label" htmlFor="profile-name">
                Nombre
              </label>
              <input
                id="profile-name"
                className="form-input"
                placeholder="Juan"
                defaultValue="Juan"
                required
              />
              <p className="form-feedback">Ingresá tu nombre.</p>
            </div>

            <div className="form-field auth-field">
              <label className="form-label" htmlFor="profile-lastname">
                Apellido
              </label>
              <input
                id="profile-lastname"
                className="form-input"
                placeholder="Pérez"
                defaultValue="Pérez"
                required
              />
              <p className="form-feedback">Ingresá tu apellido.</p>
            </div>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="profile-email">
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              className="form-input"
              placeholder="tu@email.com"
              defaultValue="juan@email.com"
              required
            />
            <p className="form-feedback">Ingresá un email válido.</p>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="profile-password">
              Contraseña actual
            </label>
            <input
              id="profile-password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <p className="form-feedback">
              Ingresá tu contraseña actual.
            </p>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="profile-new-password">
              Nueva contraseña
            </label>
            <input
              id="profile-new-password"
              type="password"
              className="form-input"
              placeholder="Dejalo vacío para no cambiarla"
            />
          </div>

          <button
            type="submit"
            className="app-btn app-btn-primary app-btn-block"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;