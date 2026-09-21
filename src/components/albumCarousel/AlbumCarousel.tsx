import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ArtistAlbum } from "../../services/artist.service";
import "./AlbumCarousel.css";

type AlbumCarouselProps = {
  albums: ArtistAlbum[];
};

const AlbumCarousel = ({ albums }: AlbumCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  // the carousel always shows 5 albums per page (--per-page in the CSS);
  // read it back so the paging math always matches what's on screen
  const [perPage, setPerPage] = useState(5);

  const totalPages = Math.max(1, Math.ceil(albums.length / perPage));

  // clamp the page to the current range during render: the number of
  // pages can shrink if the viewport/per-page changes, and clamping here
  // avoids mutating state from an effect
  const safePage = Math.min(page, totalPages - 1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const currentPerPage =
        parseInt(
          getComputedStyle(track).getPropertyValue("--per-page"),
          10,
        ) || 5;
      setPerPage(currentPerPage);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // scroll the track natively to the first album of the current page;
  // using the real scroll container is far more reliable than a manual
  // transform, since programmatic scroll always reveals the new items
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
        <h2>Álbumes</h2>
        <p>No hay álbumes para este artista.</p>
      </section>
    );
  }

  return (
    <section className="artist-albums album-carousel-section">
      <h2>Álbumes</h2>
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
              to={`/album/${encodeURIComponent(album.title)}`}
              className="album-carousel-item"
              key={album.externalId}
            >
              <div className="album-carousel-cover-wrap">
                <img
                  src={album.cover_big}
                  alt={`Portada del álbum ${album.title}`}
                  className="album-carousel-cover"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <span className="album-carousel-title">{album.title}</span>
              {album.release_date && (
                <span className="album-carousel-year">
                  {album.release_date.slice(0, 4)}
                </span>
              )}
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