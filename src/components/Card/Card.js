import React from "react";

const Card = ({ _id, title, description, creator, thumbnail }) => {
  return (
    <div className="card card-shadow vertical-card">
      <div className="card-header">
        <img src={thumbnail} alt="thumbnail" className="card-image" />
      </div>
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-subtext">
          <div className="video-description">{description}</div>
        </div>
      </div>
      <div className="card-buttons flex-row justify-center align-center flex-wrap">
        <button className="btn btn-primary text-btn">WATCH LATER</button>
      </div>
    </div>
  );
};

export default Card;
