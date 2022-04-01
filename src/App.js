import "./App.css";
import Mockman from "mockman-js";
import { Route, Routes } from "react-router-dom";
import {
  Browse,
  Homepage,
  LikedVideos,
  Login,
  Playlists,
  SignUp,
  WatchLater,
} from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/watchlater" element={<WatchLater />} />
        <Route path="/likedvideos" element={<LikedVideos />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/Mockman" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
