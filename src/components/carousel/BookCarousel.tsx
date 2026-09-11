import { useEffect, useRef } from "react";
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import BookItem from "../bookItem/BookItem";

type Book = {
  id: number;
  title: string;
  author: string;
  rating: number;
  pageCount: number;
  imageUrl: string;
  available: boolean;
};

type BookCarouselProps = {
  books: Book[];
  onUpdateTitle: (id: number, newTitle: string) => void;
};

const BookCarousel = ({ books, onUpdateTitle }: BookCarouselProps) => {
  const splideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splideRef.current) return;

    const splide = new Splide(splideRef.current, {
      type: "loop",
      perPage: 3,
      perMove: 1,
      autoplay: true,
      gap: "1rem",
      breakpoints: {
        992: { perPage: 2 },
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
    <div className="splide" ref={splideRef} aria-label="Carrusel de libros">
      <div className="splide__track">
        <ul className="splide__list">
          {books.map((book) => (
            <li className="splide__slide" key={book.id}>
              <BookItem
                title={book.title}
                author={book.author}
                rating={book.rating}
                pageCount={book.pageCount}
                imageUrl={book.imageUrl}
                available={book.available}
                onUpdateTitle={(newTitle) => onUpdateTitle(book.id, newTitle)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookCarousel;
