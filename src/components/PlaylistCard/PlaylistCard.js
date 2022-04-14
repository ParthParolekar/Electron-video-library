import React from "react";
import { useNavigate } from "react-router-dom";
import { LikedVideos } from "../../pages";
import DeletePlaylistButton from "../DeletePlaylistButton/DeletePlaylistButton";

const PlaylistCard = ({ playlist }) => {
  const navigate = useNavigate();
  const { title, description, _id, videos } = playlist;

  const clickhandler = (e) => {
    if (e.target.tagName !== "BUTTON") {
      navigate(`/playlists/${_id}`);
    }
  };
  return (
    <div
      className="playlist-card card-shadow vertical-card"
      onClick={clickhandler}
    >
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-subtext">
          <div className="video-description">{description}</div>
          <h4>{videos.length} video(s)</h4>
        </div>
      </div>
      <div className="card-buttons flex-row justify-center align-center flex-wrap">
        <DeletePlaylistButton playlist={playlist} />
      </div>
    </div>
  );
};

export default PlaylistCard;
