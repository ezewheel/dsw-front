type Review = {
  song: string;
  author: string;
  rating: number;
  text: string;
  imageUrl: string;
};

const REVIEWS: Review[] = [
  {
    song: "Bohemian Rhapsody",
    author: "Martina_92",
    rating: 5,
    imageUrl: "/images/bohemian-rhapsody.svg",
    text: "Una obra maestra. Cada vez que la escucho encuentro algo nuevo, de la intro de piano al solo de guitarra. Es imposible quedarse quieto.",
  },
  {
    song: "Billie Jean",
    author: "DJ_Nico",
    rating: 5,
    imageUrl: "/images/billie-jean.svg",
    text: "El bajo y el groove de esta canción definieron una época. Michael Jackson supo construir algo inmortal.",
  },
  {
    song: "Hotel California",
    author: "SofiRock",
    rating: 4,
    imageUrl: "/images/hotel-california.svg",
    text: "La atmósfera es increíble y el solo final es de los mejores de la historia. Le doy 4 porque tarda un poco en arrancar.",
  },
  {
    song: "Imagine",
    author: "Juan_Paz",
    rating: 5,
    imageUrl: "/images/imagine.svg",
    text: "Más que una canción, es un mensaje. La melodía es simple pero llega directo al corazón. La escucho en los días grises.",
  },
  {
    song: "Smells Like Teen Spirit",
    author: "Lucas_Grunge",
    rating: 5,
    imageUrl: "/images/smells-like-teen-spirit.svg",
    text: "La canción que cambió el rumbo de la música. El riff inicial sigue sonando tan fresco como en los 90.",
  },
  {
    song: "Thriller",
    author: "Cami_Blues",
    rating: 4,
    imageUrl: "/images/thriller.svg",
    text: "El video es una locura y la canción tiene una energía increíble. Le saco una estrella porque quiero el final más largo.",
  },
  {
    song: "Don't Stop Me Now",
    author: "Fede_T",
    rating: 5,
    imageUrl: "/images/dont-stop-me-now.svg",
    text: "Imposible escucharla sin sonreír. Es la definición de energía pura. Queen en su mejor momento.",
  },
  {
    song: "Woman",
    author: "Vale_88",
    rating: 4,
    imageUrl: "/images/woman.svg",
    text: "La voz de John Lennon acá suena cálida y sincera. Una canción de amor que nunca pasa de moda.",
  },
  {
    song: "Take It Easy",
    author: "Nacho_Country",
    rating: 4,
    imageUrl: "/images/take-it-easy.svg",
    text: "Pura brisa californiana. Perfecta para manejar de noche con la ventanilla baja.",
  },
  {
    song: "Heart-Shaped Box",
    author: "Abril_L",
    rating: 5,
    imageUrl: "/images/heart-shaped-box.svg",
    text: "Oscura, intensa y brutal. Nirvana demostró que sabía hacer canciones de una crudeza enorme con una melodía escondida.",
  },
];

const Stars = ({ rating }: { rating: number }) => (
  <span className="stars" aria-label={`${rating} de 5 estrellas`}>
    {"★".repeat(rating)}
    <span className="stars-empty">{"★".repeat(5 - rating)}</span>
  </span>
);

const ReviewsSection = () => {
  return (
    <section className="reviews-section">
      <h2 className="reviews-title">Reseñas que capaz te interesen</h2>
      <div className="reviews-list">
        {REVIEWS.map((review) => (
          <article
            className="review-item"
            key={`${review.song}-${review.author}`}
          >
            <img
              className="review-cover"
              src={review.imageUrl}
              alt={`Portada de ${review.song}`}
            />
            <div className="review-content">
              <div className="review-header">
                <span className="review-song">{review.song}</span>
                <Stars rating={review.rating} />
              </div>
              <div className="review-author">{review.author}</div>
              <p className="review-text">{review.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;