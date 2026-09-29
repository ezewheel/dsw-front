import { FaCompass } from "react-icons/fa";
import NotFound from "../../components/notFound/NotFound";
import "./NotFoundPage.css";

const NotFoundPage = () => (
  <div className="app-container not-found-page">
    <NotFound
      icon={<FaCompass />}
      title="Página no encontrada"
      text="La dirección que ingresaste no existe o cambió."
    />
  </div>
);

export default NotFoundPage;
