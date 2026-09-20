import { Link, useParams } from "react-router-dom";
import "./ArtistDetail.css";
import "../songDetail/detail.css";

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  imageUrl: string;
};

type ArtistDetailProps = {
  songs: Song[];
  scores: Record<number, number | null>;
};

type AlbumGroup = {
  name: string;
  songs: Song[];
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")} min`;
};

const ArtistDetail = ({ songs, scores }: ArtistDetailProps) => {
  const { name } = useParams();
  const artist = decodeURIComponent(name ?? "");
  const artistSongs = songs.filter((s) => s.artist === artist);

  if (artistSongs.length === 0) {
    return (
      <div className="app-container artist-detail">
        <p>Artista no encontrado.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  const songScores = artistSongs
    .map((s) => scores[s.id])
    .filter((s): s is number => s !== null && s !== undefined);

  const rating =
    songScores.length > 0
      ? songScores.reduce((acc, s) => acc + s, 0) / songScores.length
      : null;

  const albumGroups: AlbumGroup[] = [];
  artistSongs.forEach((song) => {
    const existing = albumGroups.find((g) => g.name === song.album);
    if (existing) {
      existing.songs.push(song);
    } else {
      albumGroups.push({ name: song.album, songs: [song] });
    }
  });

  return (
    <div className="app-container artist-detail">
      <Link to="/" className="song-detail-back">
        ← Volver
      </Link>

      <header className="artist-hero">
        <h1>{artist}</h1>
        <div className="artist-facts">
          <span className="artist-rating">
            {rating === null ? "Sin puntaje" : `${rating.toFixed(1)} / 5`}
          </span>
          <span className="artist-facts-dot">•</span>
          <span>
            {artistSongs.length} canción{artistSongs.length === 1 ? "" : "es"}
          </span>
          <span className="artist-facts-dot">•</span>
          <span>
            {albumGroups.length} álbum{albumGroups.length === 1 ? "" : "es"}
          </span>
        </div>
      </header>

      <section className="artist-albums">
        <h2>Álbumes y canciones</h2>
        {albumGroups.map((album) => (
          <div className="album-card" key={album.name}>
            <img
              src={album.songs[0].imageUrl}
              alt={`Portada del álbum ${album.name}`}
              className="album-cover"
            />
            <div className="album-info">
              <h3>
                <Link
                  to={`/album/${encodeURIComponent(album.name)}`}
                  className="artist-link"
                >
                  {album.name}
                </Link>
              </h3>
              <p className="album-meta">
                {album.songs.length} canción
                {album.songs.length === 1 ? "" : "es"}
              </p>
              <ul className="album-songs">
                {album.songs.map((song) => (
                  <li key={song.id}>
                    <Link to={`/song/${song.id}`} className="artist-link">
                      {song.title}
                    </Link>
                    <span className="album-song-score">
                      {scores[song.id] === null || scores[song.id] === undefined
                        ? "Sin puntaje"
                        : `${(scores[song.id] as number).toFixed(1)} / 5`}
                      {" · "}
                      {formatDuration(song.duration)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ArtistDetail;