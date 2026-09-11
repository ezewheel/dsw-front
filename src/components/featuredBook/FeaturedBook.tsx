import { Badge, Button } from "react-bootstrap";

type FeaturedBookProps = {
  title: string;
  author: string;
  rating: number;
  pageCount: number;
  imageUrl: string;
  available: boolean;
  onUpdateTitle: (newTitle: string) => void;
};

const FeaturedBook = ({
  title,
  author,
  rating,
  pageCount,
  imageUrl,
  available,
  onUpdateTitle,
}: FeaturedBookProps) => {
  const handleUpdateTitle = () => {
    const newTitle = window.prompt("Nuevo título:", title);
    if (newTitle && newTitle.trim() !== "") {
      onUpdateTitle(newTitle.trim());
    }
  };

  return (
    <div className="featured-book">
      <img
        className="featured-book-image"
        src={imageUrl}
        alt={`Portada de ${title}`}
      />
      <div className="featured-book-overlay">
        <div className="mb-2">
          {available ? (
            <Badge bg="success">Disponible</Badge>
          ) : (
            <Badge bg="danger">Reservado</Badge>
          )}
        </div>
        <h2 className="featured-book-title">{title}</h2>
        <div className="featured-book-author">{author}</div>
        <div className="featured-book-meta">
          <span>
            {rating} estrella{rating > 1 ? "s" : ""}
          </span>
          <span className="featured-book-dot">•</span>
          <span>{pageCount} páginas</span>
        </div>
        <Button variant="primary" size="sm" onClick={handleUpdateTitle}>
          Actualizar título
        </Button>
      </div>
    </div>
  );
};

export default FeaturedBook;