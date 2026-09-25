import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

type NotFoundProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

const NotFound = ({ icon, title, text }: NotFoundProps) => (
  <div className="not-found">
    <span className="not-found-icon" aria-hidden="true">
      {icon}
    </span>
    <h1 className="not-found-title">{title}</h1>
    <p className="not-found-text">{text}</p>
    <Link to="/" className="app-btn app-btn-primary not-found-cta">
      Volver al inicio
    </Link>
  </div>
);

export default NotFound;
