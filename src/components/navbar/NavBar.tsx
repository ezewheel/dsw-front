import { useState } from "react";
import { Button, Form, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const closeMenu = () => setShowOffcanvas(false);

  return (
    <>
      <Navbar className="navbar-custom" expand={false}>
        <Button
          variant="outline-light"
          className="navbar-toggle"
          onClick={() => setShowOffcanvas(true)}
          aria-label="Abrir menú"
        >
          <span className="navbar-toggle-line" />
          <span className="navbar-toggle-line" />
          <span className="navbar-toggle-line" />
        </Button>
        <Navbar.Brand className="navbar-brand-custom" as={Link} to="/">
          Book Champions
        </Navbar.Brand>
        <Form className="d-flex ms-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="search-wrap">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Form.Control
              type="search"
              placeholder="Buscar libros..."
              aria-label="Buscar"
              className="search-input"
            />
          </div>
        </Form>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="offcanvas-options">
            <li>
              <Link to="/login" onClick={closeMenu}>
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={closeMenu}>
                Registrarse
              </Link>
            </li>
            <li>
              <Link to="/" onClick={closeMenu}>
                Menú
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;