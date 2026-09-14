import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

type Album = {
  name: string;
  artist: string;
  imageUrl: string;
  songCount: number;
  score: number | null;
};

type AlbumCarouselProps = {
  albums: Album[];
};

const AlbumCarousel = ({ albums }: AlbumCarouselProps) => {
  const splideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splideRef.current) return;

    const splide = new Splide(splideRef.current, {
      type: "loop",
      perPage: 1,
      autoplay: true,
      gap: "1rem",
      pagination: false,
    });

    splide.mount();

    return () => {
      splide.destroy();
    };
  }, []);

  return (
    <div className="splide" ref={splideRef} aria-label="Carrusel de álbumes">
      <div className="splide__track">
        <ul className="splide__list">
          {albums.map((album) => (
            <li className="splide__slide" key={album.name}>
              <Card className="song-card">
                <Link to={`/album/${encodeURIComponent(album.name)}`}>
                  <Card.Img
                    variant="top"
                    src={album.imageUrl}
                    alt={`Portada de ${album.name}`}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    <Link
                      to={`/album/${encodeURIComponent(album.name)}`}
                      className="song-title-link"
                    >
                      {album.name}
                    </Link>
                  </Card.Title>
                  <Card.Subtitle>
                    <Link
                      to={`/artist/${encodeURIComponent(album.artist)}`}
                      className="artist-link"
                    >
                      {album.artist}
                    </Link>
                  </Card.Subtitle>
                  <div>
                    {album.score === null
                      ? "Sin puntaje"
                      : `${album.score.toFixed(1)} / 5`}
                  </div>
                  <p>
                    {album.songCount} canción
                    {album.songCount === 1 ? "" : "es"}
                  </p>
                  <Link
                    to={`/album/${encodeURIComponent(album.name)}`}
                    className="btn btn-primary mt-auto"
                  >
                    Explorar
                  </Link>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlbumCarousel;