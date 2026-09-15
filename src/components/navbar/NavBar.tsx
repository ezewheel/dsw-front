import { useState } from "react";
import { Button, Form, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const closeMenu = () => setShowOffcanvas(false);

  return (
    <>
      <Navbar sticky="top" className="navbar-custom" expand={false}>
        <Button
          variant="outline-light"
          className="navbar-toggle d-lg-none"
          onClick={() => setShowOffcanvas(true)}
          aria-label="Abrir menú"
        >
          <span className="navbar-toggle-line" />
          <span className="navbar-toggle-line" />
          <span className="navbar-toggle-line" />
        </Button>
        <Nav className="desktop-nav d-none d-lg-flex">
          <Nav.Link as={Link} to="/login">
            Iniciar sesión
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            Registrarse
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Mi perfil
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Menú
          </Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
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
              placeholder="Buscar canciones..."
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
              <Link to="/profile" onClick={closeMenu}>
                Mi perfil
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