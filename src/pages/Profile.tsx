import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

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
    <Container className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Mi perfil</h2>
        <p className="auth-subtitle">Editá los datos de tu cuenta</p>
        {saved && (
          <Alert variant="success" onClose={() => setSaved(false)} dismissible>
            Tus datos se guardaron correctamente.
          </Alert>
        )}
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <div className="auth-row">
            <Form.Group className="mb-3 auth-field" controlId="profile-name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control placeholder="Juan" defaultValue="Juan" required />
              <Form.Control.Feedback type="invalid">
                Ingresá tu nombre.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3 auth-field"
              controlId="profile-lastname"
            >
              <Form.Label>Apellido</Form.Label>
              <Form.Control placeholder="Pérez" defaultValue="Pérez" required />
              <Form.Control.Feedback type="invalid">
                Ingresá tu apellido.
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="profile-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="tu@email.com"
              defaultValue="juan@email.com"
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresá un email válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="profile-password">
            <Form.Label>Contraseña actual</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <Form.Control.Feedback type="invalid">
              Ingresá tu contraseña actual.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="profile-new-password"
          >
            <Form.Label>Nueva contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Dejalo vacío para no cambiarla"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Guardar cambios
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Profile;