import axios from "axios";
import React, { useState, useEffect } from "react";

import { useAuth, useUser } from "../../Context";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import DeletePlaylistButton from "../DeletePlaylistButton/DeletePlaylistButton";

const PlaylistModal = () => {
  const [userState, userDispatch] = useUser();
  const [authState] = useAuth();
  const [playlistModalClass, setPlaylistModalClass] = useState("");

  useEffect(() => {
    setPlaylistModalClass(
      userState.playlistModal.showPlaylistModal
        ? "playlist-modal show-playlist-modal"
        : "playlist-modal hide-playlist-modal"
    );
  }, [userState.playlistModal.showPlaylistModal]);

  const playlistChangeHandler = async (e, playlist) => {
    if (e.target.checked) {
      try {
        await axios
          .post(
            `/api/user/playlists/${playlist._id}`,
            {
              video: userState.playlistModal.videoToAdd,
            },
            {
              headers: { authorization: authState.encodedToken },
            }
          )
          .then((res) =>
            userDispatch({
              type: "PLAYLIST_VIDEO_HANDLER",
              payload: res.data.playlist,
            })
          );
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios
          .delete(
            `/api/user/playlists/${playlist._id}/${userState.playlistModal.videoToAdd._id}`,
            {
              headers: { authorization: authState.encodedToken },
            },
            {
              video: userState.playlistModal.videoToAdd,
            }
          )
          .then((res) =>
            userDispatch({
              type: "PLAYLIST_VIDEO_HANDLER",
              payload: res.data.playlist,
            })
          );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const dismissModal = () => {
    userDispatch({ type: "PLAYLIST_MODAL_HANDLER", payload: false });
  };

  return (
    <div className={playlistModalClass}>
      <div className="modal">
        <h3 className="modal-title">Playlist Manager</h3>
        <div className="flex-row space-between">
          <div className="flex-column">
            {userState.playlists.map((playlist) => {
              return (
                <label key={playlist._id} htmlFor={playlist}>
                  <DeletePlaylistButton playlist={playlist} icon={true} />
                  <input
                    className="mg-sm-left-right"
                    type="checkbox"
                    name={playlist}
                    onChange={(e) => playlistChangeHandler(e, playlist)}
                    checked={playlist.videos.some(
                      (video) =>
                        video._id === userState.playlistModal.videoToAdd._id
                    )}
                  />
                  {playlist.title}
                </label>
              );
            })}
          </div>
          <CreatePlaylist />
        </div>
        <i className="fas fa-times modal-dismiss" onClick={dismissModal}></i>
      </div>
    </div>
  );
};

export default PlaylistModal;
