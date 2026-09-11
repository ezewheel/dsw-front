import { useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import BookCarousel from "./components/carousel/BookCarousel";
import FeaturedBook from "./components/featuredBook/FeaturedBook";
import NavBar from "./components/navbar/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

type Book = {
  id: number;
  title: string;
  author: string;
  rating: number;
  pageCount: number;
  imageUrl: string;
  available: boolean;
};

const initialBooks: Book[] = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    rating: 5,
    pageCount: 410,
    imageUrl: "/images/cien-anos-de-soledad.svg",
    available: true,
  },
  {
    id: 2,
    title: "El túnel",
    author: "Ernesto Sábato",
    rating: 3,
    pageCount: 320,
    imageUrl: "/images/el-tunel.svg",
    available: false,
  },
  {
    id: 3,
    title: "Rayuela",
    author: "Julio Cortázar",
    rating: 2,
    pageCount: 350,
    imageUrl: "/images/rayuela.svg",
    available: true,
  },
  {
    id: 4,
    title: "Locura Mix",
    author: "Bruno Peirone",
    rating: 4,
    pageCount: 200,
    imageUrl: "/images/locura-mix.svg",
    available: true,
  },
  {
    id: 5,
    title: "Culo Sas",
    author: "El GG Naco",
    rating: 5,
    pageCount: 1000,
    imageUrl: "/images/culo-sas.svg",
    available: false,
  },
  {
    id: 6,
    title: "Mi Casa Tio",
    author: "Eze Rueda",
    rating: 2,
    pageCount: 1,
    imageUrl: "/images/mi-casa-tio.svg",
    available: true,
  },
];

function App() {
  const [books, setBooks] = useState(initialBooks);

  const updateTitle = (id: number, newTitle: string) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, title: newTitle } : book,
      ),
    );
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Container className="catalog">
              <header className="catalog-header">
                <h2>Book Champions app</h2>
                <p>Quiero leer libros</p>
              </header>
              <FeaturedBook
                title={books[0].title}
                author={books[0].author}
                rating={books[0].rating}
                pageCount={books[0].pageCount}
                imageUrl={books[0].imageUrl}
                available={books[0].available}
                onUpdateTitle={(newTitle) => updateTitle(books[0].id, newTitle)}
              />
              <section className="mt-5">
                <h3 className="text-center mb-4">Recomendados</h3>
                <BookCarousel books={books} onUpdateTitle={updateTitle} />
              </section>
            </Container>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
