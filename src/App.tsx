import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import { AuthModalsProvider } from "./components/authModals/AuthModalsProvider";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import SongDetail from "./pages/songDetail/SongDetail";
import ArtistDetail from "./pages/artistDetail/ArtistDetail";
import AlbumDetail from "./pages/albumDetail/AlbumDetail";
import {
  initialComments,
  initialSongs,
  type Comment,
} from "./data/mockData";

const averageScore = (list: Comment[] | undefined): number | null => {
  if (!list || list.length === 0) return null;
  return list.reduce((acc, c) => acc + c.rating, 0) / list.length;
};

function App() {
  const [songs, setSongs] = useState(initialSongs);
  const [comments, setComments] =
    useState<Record<number, Comment[]>>(initialComments);
  const [albumComments, setAlbumComments] = useState<Record<string, Comment[]>>(
    {},
  );

  const addPlay = (id: number) => {
    setSongs((prev) =>
      prev.map((song) =>
        song.id === id ? { ...song, plays: song.plays + 1 } : song,
      ),
    );
  };

  const scores: Record<number, number | null> = {};
  songs.forEach((song) => {
    scores[song.id] = averageScore(comments[song.id]);
  });

  const addComment = (songId: number, comment: Comment) => {
    setComments((prev) => ({
      ...prev,
      [songId]: [...(prev[songId] ?? []), comment],
    }));
  };

  const addAlbumComment = (albumName: string, comment: Comment) => {
    setAlbumComments((prev) => ({
      ...prev,
      [albumName]: [...(prev[albumName] ?? []), comment],
    }));
  };

  return (
    <AuthModalsProvider>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home songs={songs} scores={scores} addPlay={addPlay} />}
        />
        <Route
          path="/song/:id"
          element={
            <SongDetail
              songs={songs}
              comments={comments}
              scores={scores}
              addComment={addComment}
              addPlay={addPlay}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/artist/:name"
          element={<ArtistDetail songs={songs} scores={scores} />}
        />
        <Route
          path="/album/:name"
          element={
            <AlbumDetail
              songs={songs}
              scores={scores}
              albumComments={albumComments}
              addAlbumComment={addAlbumComment}
            />
          }
        />
      </Routes>
    </AuthModalsProvider>
  );
}

export default App;