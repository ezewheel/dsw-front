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
    title: "Calificar cada canción en una escala de cinco estrellas",
    text: "Dale a cada canción una puntuación de una a cinco estrellas según cuánto te haya gustado. Tus calificaciones ayudan a descubrir qué canciones son las favoritas de la comunidad.",
  },
  {
    title: "Escuchar cualquier canción y álbum que desees",
    text: "Explorá una amplia variedad de canciones y álbumes, descubrí nuevos artistas y escuchá tus temas favoritos desde un mismo lugar.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">BeatGround te permite...</h2>
      <div className="features-list">
        {FEATURES.map((feature, i) => (
          <div
            className={`feature-row ${i % 2 === 1 ? "feature-row--right" : ""}`}
            key={feature.title}
          >
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
