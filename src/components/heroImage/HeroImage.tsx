import "./HeroImage.css";

const HeroImage = () => {
  return (
    <div className="hero-image">
      <img
        className="hero-image-img"
        src="/images/hero.webp"
        alt="Hero de BeatGround"
      />
      <div className="hero-image-text">
        Todas las canciones que buscas y más, en BeatGround
      </div>
    </div>
  );
};

export default HeroImage;