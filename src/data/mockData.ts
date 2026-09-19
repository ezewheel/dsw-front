export type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  imageUrl: string;
  plays: number;
};

export type Comment = {
  rating: number;
  text: string;
};

export const initialSongs: Song[] = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: 355,
    imageUrl: "/images/bohemian-rhapsody.svg",
    plays: 1240000,
  },
  {
    id: 7,
    title: "We Will Rock You",
    artist: "Queen",
    album: "News of the World",
    duration: 122,
    imageUrl: "/images/we-will-rock-you.svg",
    plays: 1200000,
  },
  {
    id: 8,
    title: "Don't Stop Me Now",
    artist: "Queen",
    album: "Jazz",
    duration: 209,
    imageUrl: "/images/dont-stop-me-now.svg",
    plays: 890000,
  },
  {
    id: 2,
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    duration: 183,
    imageUrl: "/images/imagine.svg",
    plays: 980000,
  },
  {
    id: 9,
    title: "Jealous Guy",
    artist: "John Lennon",
    album: "Imagine",
    duration: 254,
    imageUrl: "/images/jealous-guy.svg",
    plays: 340000,
  },
  {
    id: 10,
    title: "Woman",
    artist: "John Lennon",
    album: "Double Fantasy",
    duration: 213,
    imageUrl: "/images/woman.svg",
    plays: 280000,
  },
  {
    id: 3,
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    duration: 301,
    imageUrl: "/images/smells-like-teen-spirit.svg",
    plays: 1560000,
  },
  {
    id: 11,
    title: "Come as You Are",
    artist: "Nirvana",
    album: "Nevermind",
    duration: 218,
    imageUrl: "/images/come-as-you-are.svg",
    plays: 770000,
  },
  {
    id: 12,
    title: "Heart-Shaped Box",
    artist: "Nirvana",
    album: "In Utero",
    duration: 279,
    imageUrl: "/images/heart-shaped-box.svg",
    plays: 520000,
  },
  {
    id: 4,
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: 294,
    imageUrl: "/images/billie-jean.svg",
    plays: 9800000,
  },
  {
    id: 5,
    title: "Thriller",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: 357,
    imageUrl: "/images/thriller.svg",
    plays: 8900000,
  },
  {
    id: 13,
    title: "Beat It",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: 258,
    imageUrl: "/images/beat-it.svg",
    plays: 7600000,
  },
  {
    id: 14,
    title: "Man in the Mirror",
    artist: "Michael Jackson",
    album: "Bad",
    duration: 300,
    imageUrl: "/images/man-in-the-mirror.svg",
    plays: 4300000,
  },
  {
    id: 6,
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    duration: 390,
    imageUrl: "/images/hotel-california.svg",
    plays: 1520000,
  },
  {
    id: 15,
    title: "Take It Easy",
    artist: "Eagles",
    album: "Eagles",
    duration: 209,
    imageUrl: "/images/take-it-easy.svg",
    plays: 610000,
  },
  {
    id: 16,
    title: "Desperado",
    artist: "Eagles",
    album: "Desperado",
    duration: 224,
    imageUrl: "/images/desperado.svg",
    plays: 580000,
  },
];

export const initialComments: Record<number, Comment[]> = {
  1: [
    { rating: 5, text: "Una obra maestra que nunca pasa de moda." },
    { rating: 4, text: "La parte de la ópera es increíble." },
    { rating: 5, text: "No me canso de escucharla." },
  ],
  7: [
    { rating: 4, text: "Perfecta para cantar en estadios." },
    { rating: 5, text: "El ritmo más contagioso de Queen." },
    { rating: 4, text: "Puro himno generacional." },
  ],
  8: [
    { rating: 5, text: "La energía más pura en una canción." },
    { rating: 4, text: "Ideal para levantar el ánimo." },
    { rating: 4, text: "Freddie en su máximo esplendor." },
  ],
  2: [
    { rating: 5, text: "Un himno atemporal lleno de paz." },
    { rating: 4, text: "Letra simple pero muy profunda." },
    { rating: 4, text: "Perfecta para reflexionar." },
  ],
  9: [
    { rating: 4, text: "Melodía dulce y letra honesta." },
    { rating: 5, text: "Una de las mejores de Lennon." },
    { rating: 3, text: "Lenta pero muy emotiva." },
  ],
  10: [
    { rating: 4, text: "Un homenaje hermoso a Yoko." },
    { rating: 4, text: "Simple y con mucho cariño." },
    { rating: 3, text: "Linda pero no la mejor." },
  ],
  3: [
    { rating: 4, text: "El himno de toda una generación." },
    { rating: 5, text: "Marcó un antes y un después en el rock." },
    { rating: 3, text: "Muy buena pero un poco sobrevalorada." },
  ],
  11: [
    { rating: 5, text: "El riff más relajante de los 90." },
    { rating: 4, text: "Kurt hablando directo al alma." },
    { rating: 4, text: "Atemporal." },
  ],
  12: [
    { rating: 5, text: "Oscura, cruda y brillante." },
    { rating: 4, text: "La energía de Nirvana en estado puro." },
    { rating: 4, text: "Un favorito personal." },
  ],
  4: [
    { rating: 5, text: "El bajo de esta canción es legendario." },
    { rating: 4, text: "Michael en su mejor momento." },
    { rating: 4, text: "Imposible no moverse con el ritmo." },
  ],
  5: [
    { rating: 4, text: "El videoclip más icónico de la historia." },
    { rating: 5, text: "De las mejores canciones de Halloween." },
    { rating: 3, text: "Buenísima, aunque prefiero Billie Jean." },
  ],
  13: [
    { rating: 5, text: "El solo de Eddie Van Halen es brutal." },
    { rating: 4, text: "Ritmo y actitud inigualables." },
    { rating: 4, text: "Un clásico de los 80." },
  ],
  14: [
    { rating: 5, text: "La letra más inspiradora de Michael." },
    { rating: 4, text: "Emotiva y motivadora." },
    { rating: 4, text: "Cierra perfecto cualquier playlist." },
  ],
  6: [
    { rating: 5, text: "El solo de guitarra final es infinito." },
    { rating: 4, text: "Atmósfera única y misteriosa." },
    { rating: 4, text: "Un clásico para cerrar la noche." },
  ],
  15: [
    { rating: 4, text: "El comienzo perfecto de Eagles." },
    { rating: 3, text: "Simple y agradable." },
    { rating: 4, text: "Suena a carretera y libertad." },
  ],
  16: [
    { rating: 5, text: "Melancolía hecha canción." },
    { rating: 4, text: "El piano que inicia es hermoso." },
    { rating: 4, text: "Una balada inolvidable." },
  ],
};