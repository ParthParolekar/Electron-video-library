import "./App.css";
import Mockman from "mockman-js";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import {
  Browse,
  Homepage,
  LikedVideos,
  Login,
  Playlists,
  SignUp,
  SinglePlaylist,
  WatchLater,
} from "./pages";
import { useState, useEffect } from "react";
import { Navbar, PlaylistModal } from "./components";
import { useAuth } from "./Context/AuthContext/AuthContext";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [authState] = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (authState.encodedToken === null) {
      setUserLoggedIn(false);
    } else {
      setUserLoggedIn(true);
    }
  }, [authState]);
  return (
    <>
      <PlaylistModal />
      <div className="App blur">
        <Navbar userLoggedIn={userLoggedIn} />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/watchlater"
            element={
              userLoggedIn ? (
                <WatchLater />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            }
          />

          <Route
            path="/playlists"
            element={
              userLoggedIn ? (
                <Playlists />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            }
          />
          <Route
            path="/likedvideos"
            element={
              userLoggedIn ? (
                <LikedVideos />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            }
          />
          <Route
            path="/playlists/:playlistId"
            element={
              userLoggedIn ? (
                <SinglePlaylist />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            }
          />
          <Route path="/Mockman" element={<Mockman />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
