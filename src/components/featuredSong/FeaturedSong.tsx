type FeaturedSongProps = {
  imageUrl: string;
};

const FeaturedSong = ({ imageUrl }: FeaturedSongProps) => {
  return (
    <div className="featured-song">
      <img
        className="featured-song-image"
        src={imageUrl}
        alt="Portada destacada"
      />
      <div className="featured-song-hero-text">
        Todas las canciones que buscas y más, en BeatGround
      </div>
    </div>
  );
};

export default FeaturedSong;
