import axios from "axios";
import React, { useState } from "react";
import { useAuth, useUser } from "../../Context";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [authState] = useAuth();
  const [userState, userDispatch] = useUser();

  const createPlaylistHandler = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "/api/user/playlists",
          {
            playlist: {
              title: playlistName,
              description: playlistDescription,
            },
          },
          {
            headers: { authorization: authState.encodedToken },
          }
        )
        .then((res) => {
          userDispatch({
            type: "PLAYLIST_HANDLER",
            payload: res.data.playlists,
          });
          setPlaylistName("");
          setPlaylistDescription("");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="flex-column jsutify-center align-center"
      onSubmit={createPlaylistHandler}
    >
      <div className="input">
        <label>Name</label>
        <input
          value={playlistName}
          type="text"
          onChange={(e) => setPlaylistName(e.target.value)}
          required
        />
      </div>
      <div className="input">
        <label>Description</label>
        <input
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
          type="text"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Playlist
      </button>
    </form>
  );
};

export default CreatePlaylist;
