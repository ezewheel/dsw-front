import { useState } from "react";
import "./StarRating.css";

const STARS = [1, 2, 3, 4, 5];

const fillPercent = (star: number, value: number): number => {
  const start = star - 1;
  return Math.min(100, Math.max(0, (value - start) * 100));
};

type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
};

const StarRating = ({
  value,
  onChange,
  readOnly = false,
  size = "md",
  label,
}: StarRatingProps) => {
  const [hover, setHover] = useState(0);
  const active = readOnly ? value : hover > 0 ? hover : value;

  const select = (next: number) => {
    if (readOnly || !onChange) return;
    onChange(next);
  };

  return (
    <div
      className={`star-rating star-rating-${size}`}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={label ?? `${value} de 5 estrellas`}
      onMouseLeave={() => setHover(0)}
    >
      {STARS.map((star) => (
        <span className="star-rating-star" key={star}>
          <span className="star-rating-back" aria-hidden="true">
            ★
          </span>
          <span
            className="star-rating-fill"
            style={{ width: `${fillPercent(star, active)}%` }}
            aria-hidden="true"
          >
            ★
          </span>
          {!readOnly && (
            <>
              <button
                type="button"
                className="star-rating-hit star-rating-hit-left"
                aria-label={`${star - 0.5} estrellas`}
                onMouseEnter={() => setHover(star - 0.5)}
                onClick={() => select(star - 0.5)}
              />
              <button
                type="button"
                className="star-rating-hit star-rating-hit-right"
                aria-label={`${star} estrellas`}
                onMouseEnter={() => setHover(star)}
                onClick={() => select(star)}
              />
            </>
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;