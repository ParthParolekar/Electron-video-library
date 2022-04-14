import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "../../Context";

const PlaylistButton = ({ video }) => {
  const [userState, userDispatch] = useUser();
  const [authState] = useAuth();
  const navigate = useNavigate();
  const displayModal = () => {
    if (authState.encodedToken === null) {
      navigate("/login");
    } else {
      userDispatch({ type: "PLAYLIST_MODAL_HANDLER", payload: true });
      userDispatch({ type: "PLAYLIST_VIDEO_TO_ADD", payload: video });
    }
  };
  return (
    <button className="btn btn-primary text-btn" onClick={displayModal}>
      PLAYLIST
    </button>
  );
};

export default PlaylistButton;
