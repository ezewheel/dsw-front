import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await login({ email, password });
      navigate("/");
    } catch {
      setError("Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Iniciar sesión</h2>
        <p className="auth-subtitle">Ingresá a tu cuenta para continuar</p>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="auth-form"
        >
          <Form.Group className="mb-3" controlId="login-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Ingresá un email válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="login-password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <Form.Control.Feedback type="invalid">
              La contraseña debe tener al menos 6 caracteres.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            type="checkbox"
            id="login-remember"
            label="Recordarme"
            className="mb-3"
          />

          {error && <Alert variant="danger">{error}</Alert>}

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </Button>
        </Form>

        <p className="auth-alt">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="auth-link">
            Registrate
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;