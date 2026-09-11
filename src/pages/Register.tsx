import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() && acceptedTerms) {
      navigate("/");
    } else {
      setValidated(true);
    }
  };

  return (
    <Container className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Registrarse</h2>
        <p className="auth-subtitle">Creá tu cuenta gratuita</p>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <div className="auth-row">
            <Form.Group className="mb-3 auth-field" controlId="register-name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control placeholder="Juan" required />
              <Form.Control.Feedback type="invalid">
                Ingresá tu nombre.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3 auth-field"
              controlId="register-lastname"
            >
              <Form.Label>Apellido</Form.Label>
              <Form.Control placeholder="Pérez" required />
              <Form.Control.Feedback type="invalid">
                Ingresá tu apellido.
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="register-email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="tu@email.com" required />
            <Form.Control.Feedback type="invalid">
              Ingresá un email válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="register-password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              required
              minLength={6}
            />
            <Form.Control.Feedback type="invalid">
              La contraseña debe tener al menos 6 caracteres.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="register-confirm-password"
          >
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" placeholder="••••••••" required />
            <Form.Control.Feedback type="invalid">
              Confirmá tu contraseña.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            type="checkbox"
            id="register-terms"
            label="Acepto los términos y condiciones"
            className="mb-3"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            isInvalid={validated && !acceptedTerms}
          />
          {validated && !acceptedTerms && (
            <div className="invalid-feedback d-block mb-2">
              Debes aceptar los términos y condiciones.
            </div>
          )}

          <Button variant="primary" type="submit" className="w-100">
            Crear cuenta
          </Button>
        </Form>

        <p className="auth-alt">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="auth-link">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Register;