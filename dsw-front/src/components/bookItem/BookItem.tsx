import { Badge, Button, Card } from "react-bootstrap";

type BookItemProps = {
  title: string;
  author: string;
  rating: number;
  pageCount: number;
  imageUrl: string;
  available: boolean;
  onUpdateTitle: (newTitle: string) => void;
};

const BookItem = ({
  title,
  author,
  rating,
  pageCount,
  imageUrl,
  available,
  onUpdateTitle,
}: BookItemProps) => {
  const handleUpdateTitle = () => {
    const newTitle = window.prompt("Nuevo título:", title);
    if (newTitle && newTitle.trim() !== "") {
      onUpdateTitle(newTitle.trim());
    }
  };

  return (
    <Card className="book-card">
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          {available ? (
            <Badge bg="success">Disponible</Badge>
          ) : (
            <Badge bg="danger">Reservado</Badge>
          )}
        </div>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>{author}</Card.Subtitle>
        <div>
          {rating} estrella{rating > 1 ? "s" : ""}
        </div>
        <p>{pageCount} páginas</p>
        <Button
          variant="primary"
          className="mt-auto"
          onClick={handleUpdateTitle}
        >
          Actualizar título
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookItem;
