import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import BookItem from "./components/bookItem/BookItem";
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
];

function App() {
  const [books, setBooks] = useState(initialBooks);

  const updateTitle = (id: number, newTitle: string) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, title: newTitle } : book)),
    );
  };

  return (
    <Container className="catalog">
      <header className="catalog-header">
        <h2>Book Champions app</h2>
        <p>Quiero leer libros</p>
      </header>
      <Row>
        {books.map((book) => (
          <Col key={book.id} xs={12} sm={6} lg={4}>
            <BookItem
              title={book.title}
              author={book.author}
              rating={book.rating}
              pageCount={book.pageCount}
              imageUrl={book.imageUrl}
              available={book.available}
              onUpdateTitle={(newTitle) => updateTitle(book.id, newTitle)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;