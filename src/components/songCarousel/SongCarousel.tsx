import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import SongItem from "../songItem/SongItem";

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  imageUrl: string;
  plays: number;
};

type SongCarouselProps = {
  songs: Song[];
  scores: Record<number, number | null>;
  onPlay: (id: number) => void;
};

const SongCarousel = ({ songs, scores, onPlay }: SongCarouselProps) => {
  const splideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splideRef.current) return;

    const splide = new Splide(splideRef.current, {
      type: "loop",
      perPage: 5,
      autoplay: true,
      gap: "0.75rem",
      arrows: false,
      breakpoints: {
        1200: { perPage: 4 },
        992: { perPage: 3 },
        768: { perPage: 2 },
        576: { perPage: 1 },
      },
      pagination: false,
    });

    splide.mount();

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <div
      className="splide song-carousel"
      ref={splideRef}
      aria-label="Carrusel de canciones"
    >
      <div className="splide__track">
        <ul className="splide__list">
          {songs.map((song) => (
            <li className="splide__slide" key={song.id}>
              <SongItem
                id={song.id}
                title={song.title}
                artist={song.artist}
                album={song.album}
                score={scores[song.id] ?? null}
                duration={song.duration}
                imageUrl={song.imageUrl}
                plays={song.plays}
                onPlay={() => onPlay(song.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SongCarousel;