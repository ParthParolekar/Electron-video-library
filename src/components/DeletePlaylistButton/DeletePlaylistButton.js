import axios from "axios";
import React from "react";
import { useUser, useAuth } from "../../Context";

const DeletePlaylistButton = ({ playlist, icon }) => {
  const [authState] = useAuth();
  const [, userDispatch] = useUser();
  const deletePlaylist = async () => {
    try {
      await axios
        .delete(
          `/api/user/playlists/${playlist._id}`,
          {
            headers: { authorization: authState.encodedToken },
          },
          {
            playlist,
          }
        )
        .then((res) => {
          userDispatch({
            type: "PLAYLIST_HANDLER",
            payload: res.data.playlists,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return icon ? (
    <i class="fas fa-trash" onClick={deletePlaylist}></i>
  ) : (
    <button className="btn btn-primary text-btn" onClick={deletePlaylist}>
      DELETE PLAYLIST
    </button>
  );
};

export default DeletePlaylistButton;
