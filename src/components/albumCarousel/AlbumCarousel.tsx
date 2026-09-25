import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ArtistAlbum } from "../../api/musical-entity";
import { entityPath } from "../../utils/routes";
import AverageRating from "../averageRating/AverageRating";
import "./AlbumCarousel.css";

type AlbumCarouselProps = {
  albums: ArtistAlbum[];
};

const AlbumCarousel = ({ albums }: AlbumCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);

  const totalPages = Math.max(1, Math.ceil(albums.length / perPage));

  const safePage = Math.min(page, totalPages - 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const currentPerPage =
        parseInt(getComputedStyle(track).getPropertyValue("--per-page"), 10) ||
        5;
      setPerPage(currentPerPage);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const items = track?.querySelectorAll<HTMLElement>(".album-carousel-item");
    if (!track || !items || items.length <= perPage) return;

    const index = Math.min(safePage * perPage, items.length - 1);
    const item = items[index];
    if (!item) return;

    const delta =
      item.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
  }, [safePage, perPage, albums]);

  const goToPage = (target: number) => {
    setPage(Math.min(Math.max(target, 0), totalPages - 1));
  };

  if (albums.length === 0) {
    return (
      <section className="artist-albums">
        <h2>Discografía</h2>
        <p>No hay álbumes para este artista.</p>
      </section>
    );
  }

  return (
    <section className="artist-albums album-carousel-section">
      <h2>Discografía</h2>
      <div className="album-carousel">
        <button
          type="button"
          className="album-carousel-arrow album-carousel-arrow-prev"
          onClick={() => goToPage(safePage - 1)}
          disabled={safePage === 0}
          aria-label="Álbumes anteriores"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div
          className={`album-carousel-track${
            totalPages === 1 ? " single-page" : ""
          }`}
          ref={trackRef}
        >
          {albums.map((album) => (
            <Link
              to={entityPath("album", album.externalId)}
              className="album-carousel-item"
              key={album.externalId}
            >
              <div className="album-carousel-cover-wrap">
                <img
                  src={album.cover}
                  alt={`Portada del álbum ${album.title}`}
                  className="album-carousel-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <span className="album-carousel-title">{album.title}</span>
              <div className="album-carousel-meta">
                {album.releaseDate && (
                  <span className="album-carousel-year">
                    {album.releaseDate.slice(0, 4)}
                  </span>
                )}
                {album.averageRating !== null && (
                  <AverageRating value={album.averageRating} size="sm" />
                )}
              </div>
            </Link>
          ))}
        </div>
        <button
          type="button"
          className="album-carousel-arrow album-carousel-arrow-next"
          onClick={() => goToPage(safePage + 1)}
          disabled={safePage >= totalPages - 1}
          aria-label="Álbumes siguientes"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default AlbumCarousel;
