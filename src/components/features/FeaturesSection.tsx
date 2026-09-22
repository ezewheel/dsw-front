import "./FeaturesSection.css";

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

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">BeatGround te permite...</h2>
      <div className="features-list">
        {FEATURES.map((feature, i) => (
          <div className="feature-row" key={feature.title}>
            <div className="feature-marker">
              <span className="feature-index">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="feature-copy">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-text">{feature.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
