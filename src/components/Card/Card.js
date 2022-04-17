import axios from "axios";
import React from "react";
import { useAuth, useUser } from "../../Context";
import LikeButton from "../LikeButton/LikeButton";
import PlaylistButton from "../PlaylistButton/PlaylistButton";
import WatchLaterButton from "../WatchLaterButton/WatchLaterButton";

const Card = ({ video }) => {
  const { _id, title, description, creator, thumbnail } = video;
  const [authState] = useAuth();
  const [userState, userDispatch] = useUser();
  const cardClickHandler = async (e) => {
    if (e.target.tagName !== "BUTTON") {
      try {
        await axios
          .post(
            "/api/user/history",
            {
              video,
            },
            {
              headers: { authorization: authState.encodedToken },
            }
          )
          .then((res) => {
            userDispatch({
              type: "HISTORY_HANDLER",
              payload: res.data.history,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="card card-shadow vertical-card" onClick={cardClickHandler}>
      <div className="card-header">
        <img src={thumbnail} alt="thumbnail" className="card-image" />
      </div>

      <div className="card-content">
        <div className="card-title">{title}</div>

        <div className="card-subtext">
          <div className="video-description">{creator}</div>
        </div>
      </div>
      <div className="card-buttons flex-row justify-center align-center flex-wrap">
        <WatchLaterButton video={video} />
        <LikeButton video={video} />
        <PlaylistButton video={video} />
      </div>
    </div>
  );
};

export default Card;
