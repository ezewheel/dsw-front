export type TopListEntry = {
  name: string;
  imageUrl: string;
  score: number;
  to: string;
};

export const topArtists: TopListEntry[] = [
  { name: "Queen", imageUrl: "/images/bohemian-rhapsody.svg", score: 4.8, to: "/artist/Queen" },
  { name: "Michael Jackson", imageUrl: "/images/thriller.svg", score: 4.7, to: "/artist/Michael Jackson" },
  { name: "John Lennon", imageUrl: "/images/imagine.svg", score: 4.6, to: "/artist/John Lennon" },
  { name: "Nirvana", imageUrl: "/images/smells-like-teen-spirit.svg", score: 4.5, to: "/artist/Nirvana" },
  { name: "Eagles", imageUrl: "/images/hotel-california.svg", score: 4.4, to: "/artist/Eagles" },
];

export const topAlbums: TopListEntry[] = [
  { name: "A Night at the Opera", imageUrl: "/images/bohemian-rhapsody.svg", score: 4.9, to: "/album/A Night at the Opera" },
  { name: "Thriller", imageUrl: "/images/thriller.svg", score: 4.7, to: "/album/Thriller" },
  { name: "Nevermind", imageUrl: "/images/smells-like-teen-spirit.svg", score: 4.6, to: "/album/Nevermind" },
  { name: "Imagine", imageUrl: "/images/imagine.svg", score: 4.5, to: "/album/Imagine" },
  { name: "Hotel California", imageUrl: "/images/hotel-california.svg", score: 4.3, to: "/album/Hotel California" },
];

export const topSongs: TopListEntry[] = [
  { name: "Bohemian Rhapsody", imageUrl: "/images/bohemian-rhapsody.svg", score: 4.9, to: "/song/1" },
  { name: "Imagine", imageUrl: "/images/imagine.svg", score: 4.8, to: "/song/2" },
  { name: "Smells Like Teen Spirit", imageUrl: "/images/smells-like-teen-spirit.svg", score: 4.7, to: "/song/3" },
  { name: "Thriller", imageUrl: "/images/thriller.svg", score: 4.6, to: "/song/5" },
  { name: "Hotel California", imageUrl: "/images/hotel-california.svg", score: 4.4, to: "/song/6" },
];