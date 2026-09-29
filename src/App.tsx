import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import { AuthModalsProvider } from "./components/authModals/AuthModalsProvider";
import HomePage from "./pages/home/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import SearchPage from "./pages/search/SearchPage";
import TrackPage from "./pages/track/TrackPage";
import ArtistPage from "./pages/artist/ArtistPage";
import AlbumPage from "./pages/album/AlbumPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";

function App() {
  return (
    <AuthModalsProvider>
      <div className="app-shell">
        <NavBar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/track/:id" element={<TrackPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/user/:id" element={<ProfilePage />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthModalsProvider>
  );
}

export default App;