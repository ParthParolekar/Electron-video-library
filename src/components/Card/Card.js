import React from "react";
import LikeButton from "../LikeButton/LikeButton";

import WatchLaterButton from "../WatchLaterButton/WatchLaterButton";

const Card = ({ video }) => {
  const { _id, title, description, creator, thumbnail } = video;

  return (
    <div className="card card-shadow vertical-card">
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
      </div>
    </div>
  );
};

export default Card;
