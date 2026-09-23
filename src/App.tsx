import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import { AuthModalsProvider } from "./components/authModals/AuthModalsProvider";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import AdvancedSearch from "./pages/advancedSearch/AdvancedSearch";
import TrackDetail from "./pages/trackDetail/TrackDetail";
import ArtistDetail from "./pages/artistDetail/ArtistDetail";
import AlbumDetail from "./pages/albumDetail/AlbumDetail";

function App() {
  return (
    <AuthModalsProvider>
      <div className="app-shell">
        <NavBar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/song/:id" element={<TrackDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/artist/:name" element={<ArtistDetail />} />
            <Route path="/album/:name" element={<AlbumDetail />} />
            <Route path="/advanced-search" element={<AdvancedSearch />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthModalsProvider>
  );
}

export default App;