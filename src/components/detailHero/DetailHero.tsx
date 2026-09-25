import type { ReactNode } from "react";
import AverageRating from "../averageRating/AverageRating";
import "./DetailHero.css";

type DetailHeroProps = {
  image: string;
  title: string;
  rating: number | null;
  children?: ReactNode;
};

const DetailHero = ({ image, title, rating, children }: DetailHeroProps) => (
  <header className="detail-hero">
    <div className="detail-hero-media">
      <img src={image} alt={title} className="detail-hero-img" />
      <div className="detail-hero-overlay">
        <h1>{title}</h1>
        <AverageRating value={rating} size="lg" />
      </div>
    </div>
    {children}
  </header>
);

export default DetailHero;
