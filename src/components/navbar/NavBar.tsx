import { useState } from "react";
import { Button, Form, Nav, Navbar, Offcanvas } from "react-bootstrap";
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

type AlbumInfo = {
  name: string;
  artist: string;
};

type NavBarProps = {
  songs: Song[];
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const NavBar = ({ songs }: NavBarProps) => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const closeMenu = () => setShowOffcanvas(false);

  const q = query.trim().toLowerCase();

  const albums: AlbumInfo[] = Array.from(
    new Map(songs.map((s) => [s.album, { name: s.album, artist: s.artist }])).values(),
  );
  const artists = Array.from(new Set(songs.map((s) => s.artist)));

  const songResults = q
    ? songs.filter(
        (s) =>
          s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q),
      )
    : [];

  const albumResults = q
    ? albums.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.artist.toLowerCase().includes(q),
      )
    : [];

  const artistResults = q
    ? artists.filter((a) => a.toLowerCase().includes(q))
    : [];

  const showResults =
    focused && q.length > 0 &&
    (songResults.length > 0 ||
      albumResults.length > 0 ||
      artistResults.length > 0);

  const closeSearch = () => {
    setQuery("");
    setFocused(false);
  };

  return (
    <>
      <Navbar className="navbar-custom" expand={false}>
        <Button
          variant="outline-light"
          className="navbar-toggle d-lg-none"
          onClick={() => setShowOffcanvas(true)}
          aria-label="Abrir menú"
        >
          <span className="navbar-toggle-line" />
          <span className="navbar-toggle-line" />
          <span className="navbar-toggle-line" />
        </Button>
        <Nav className="desktop-nav d-none d-lg-flex">
          <Nav.Link as={Link} to="/login">
            Iniciar sesión
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            Registrarse
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Mi perfil
          </Nav.Link>
          <Nav.Link as={Link} to="/">
            Menú
          </Nav.Link>
        </Nav>
        <Form
          className="d-flex"
          onSubmit={(e) => e.preventDefault()}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setFocused(false);
            }
          }}
        >
          <div className="search-wrap">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <Form.Control
              type="search"
              placeholder=""
              aria-label="Buscar"
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
            />
            {showResults && (
              <div className="search-dropdown">
                {artistResults.length > 0 && (
                  <div className="search-group">
                    <div className="search-group-label">Artistas</div>
                    {artistResults.map((artist) => (
                      <Link
                        key={artist}
                        to={`/artist/${encodeURIComponent(artist)}`}
                        className="search-result"
                        onClick={closeSearch}
                      >
                        <span className="search-result-title">{artist}</span>
                        <span className="search-result-type">artista</span>
                      </Link>
                    ))}
                  </div>
                )}
                {albumResults.length > 0 && (
                  <div className="search-group">
                    <div className="search-group-label">Álbumes</div>
                    {albumResults.map((album) => (
                      <Link
                        key={album.name}
                        to={`/album/${encodeURIComponent(album.name)}`}
                        className="search-result"
                        onClick={closeSearch}
                      >
                        <span className="search-result-title">
                          {album.name}
                          <span className="search-result-meta">
                            {" "}· {album.artist}
                          </span>
                        </span>
                        <span className="search-result-type">álbum</span>
                      </Link>
                    ))}
                  </div>
                )}
                {songResults.length > 0 && (
                  <div className="search-group">
                    <div className="search-group-label">Canciones</div>
                    {songResults.map((song) => (
                      <Link
                        key={song.id}
                        to={`/song/${song.id}`}
                        className="search-result"
                        onClick={closeSearch}
                      >
                        <span className="search-result-title">
                          {song.title}
                          <span className="search-result-meta">
                            {" "}· {song.artist} ·{" "}
                            {formatDuration(song.duration)}
                          </span>
                        </span>
                        <span className="search-result-type">canción</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Form>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="offcanvas-options">
            <li>
              <Link to="/login" onClick={closeMenu}>
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={closeMenu}>
                Registrarse
              </Link>
            </li>
            <li>
              <Link to="/profile" onClick={closeMenu}>
                Mi perfil
              </Link>
            </li>
            <li>
              <Link to="/" onClick={closeMenu}>
                Menú
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;