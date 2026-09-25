import { FaStar } from "react-icons/fa";
import "./AverageRating.css";

type AverageRatingProps = {
  value: number | null;
  size?: "sm" | "md" | "lg";
};

const AverageRating = ({ value, size = "md" }: AverageRatingProps) => {
  const className = `average-rating average-rating-${size}`;

  if (value === null) {
    return (
      <span className={`${className} average-rating-missing`}>Sin puntaje</span>
    );
  }

  return (
    <span className={className}>
      {value.toFixed(1)}
      <FaStar className="average-rating-star" aria-hidden="true" />
    </span>
  );
};

export default AverageRating;
