import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaCompass, FaPenFancy, FaStar, FaUsers } from "react-icons/fa";
import "./FeatureSection.css";

type Feature = {
  title: string;
  text: string;
  icon: IconType;
  color: string;
};

const FEATURES: Feature[] = [
  {
    title: "Escribir y compartir reseñas",
    text: "Compartí tu opinión sobre tus canciones, álbumes y artistas favoritos. Escribí reseñas, expresá lo que te transmitieron y descubrí las opiniones de otros usuarios.",
    icon: FaPenFancy,
    color: "#a855f7",
  },
  {
    title: "Puntuar canciones, álbumes y artistas",
    text: "Dale a cada canción, álbum o artista una puntuación de media a cinco estrellas según cuánto te haya gustado. Tus puntuaciones ayudan a descubrir qué es lo favorito de la comunidad.",
    icon: FaStar,
    color: "#f5c518",
  },
  {
    title: "Conocer a otros usuarios",
    text: "Buscá a otros usuarios, entrá a sus perfiles y leé sus reseñas para descubrir qué escucha y qué opina el resto de la comunidad.",
    icon: FaUsers,
    color: "#38bdf8",
  },
  {
    title: "Descubrir música nueva",
    text: "Buscá entre millones de canciones, álbumes y artistas, recorré discografías completas y encontrá lo mejor puntuado por la comunidad.",
    icon: FaCompass,
    color: "#34d399",
  },
];

const FeatureSection = () => (
  <section>
    <h2 className="section-title">BeatGround te permite...</h2>
    <div className="features-grid">
      {FEATURES.map(({ title, text, icon: Icon, color }) => (
        <article
          className="feature-card"
          key={title}
          style={{ "--feature-color": color } as CSSProperties}
        >
          <span className="feature-icon" aria-hidden="true">
            <Icon />
          </span>
          <div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-text">{text}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default FeatureSection;
