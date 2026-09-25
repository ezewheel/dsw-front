import FeatureRow from "./FeatureRow/FeatureRow";
import "./FeatureSection.css";

type Feature = {
  title: string;
  text: string;
};

const FEATURES: Feature[] = [
  {
    title: "Escribir y compartir reseñas",
    text: "Compartí tu opinión sobre tus canciones y álbumes favoritos. Escribí reseñas, expresá lo que te transmitieron y descubrí las opiniones de otros usuarios.",
  },
  {
    title: "Calificar cada canción",
    text: "Dale a cada canción una puntuación de una a cinco estrellas según cuánto te haya gustado. Tus calificaciones ayudan a descubrir qué canciones son las favoritas de la comunidad.",
  },
  {
    title: "Interactuar con otros usuarios",
    text: "Conectá con personas que comparten tus mismos gustos musicales. Comentá, likeá y seguí a otros usuarios para construir una comunidad de amantes de la música.",
  },
];

const FeatureSection = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">BeatGround te permite...</h2>
      <div>
        {FEATURES.map((feature, i) => (
          <FeatureRow
            key={i}
            index={i}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;