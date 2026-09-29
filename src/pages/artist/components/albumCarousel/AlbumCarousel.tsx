import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { ArtistAlbum } from "../../../../api/musical-entity";
import { entityPath } from "../../../../utils/routes";
import AverageRating from "../../../../components/averageRating/AverageRating";
import "./AlbumCarousel.css";

type AlbumCarouselProps = {
  albums: ArtistAlbum[];
};

const AlbumCarousel = ({ albums }: AlbumCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const scrollOneView = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth });
  };

  const updateEdges = () => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 0);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(updateEdges);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

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
          onClick={() => scrollOneView(-1)}
          disabled={atStart}
          aria-label="Álbumes anteriores"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>
        <div
          className="album-carousel-track"
          ref={trackRef}
          onScroll={updateEdges}
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
          onClick={() => scrollOneView(1)}
          disabled={atEnd}
          aria-label="Álbumes siguientes"
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default AlbumCarousel;
