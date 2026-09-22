import "./Footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} BeatGround. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;