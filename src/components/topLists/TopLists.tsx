import { Link } from "react-router-dom";

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  imageUrl: string;
  plays: number;
};

type TopListsProps = {
  songs: Song[];
  scores: Record<number, number | null>;
};

const TOP_COUNT = 5;

const TopLists = ({ songs, scores }: TopListsProps) => {
  const mostPlayed = [...songs].sort((a, b) => b.plays - a.plays).slice(0, TOP_COUNT);

  const bestRated = songs
    .map((song) => ({ song, score: scores[song.id] }))
    .filter(
      (item): item is { song: Song; score: number } =>
        item.score !== null && item.score !== undefined,
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_COUNT);

  return (
    <div className="top-lists">
      <section className="top-list">
        <h3>Canciones más escuchadas</h3>
        {mostPlayed.map((song, i) => (
          <div className="top-item" key={song.id}>
            <span className="top-rank">{i + 1}</span>
            <img src={song.imageUrl} alt={`Portada de ${song.title}`} />
            <div className="top-info">
              <Link to={`/song/${song.id}`} className="song-title-link">
                {song.title}
              </Link>
              <div className="top-meta">
                {song.plays.toLocaleString("es-AR")} reproducciones
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="top-list">
        <h3>Canciones mejor votadas</h3>
        {bestRated.length === 0 ? (
          <p className="comments-empty">No hay votaciones todavía.</p>
        ) : (
          bestRated.map(({ song, score }, i) => (
            <div className="top-item" key={song.id}>
              <span className="top-rank">{i + 1}</span>
              <img src={song.imageUrl} alt={`Portada de ${song.title}`} />
              <div className="top-info">
                <Link to={`/song/${song.id}`} className="song-title-link">
                  {song.title}
                </Link>
                <div className="top-meta">{score.toFixed(1)} / 5</div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default TopLists;