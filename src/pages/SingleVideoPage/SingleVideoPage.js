import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LikeButton from "../../components/LikeButton/LikeButton";
import PlaylistButton from "../../components/PlaylistButton/PlaylistButton";
import WatchLaterButton from "../../components/WatchLaterButton/WatchLaterButton";

const SingleVideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState({});
  useEffect(() => {
    try {
      axios
        .get(`/api/video/${videoId}`)
        .then((res) => setVideo(res.data.video));
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="flex-column align-center justify-center video-page-layout">
      <div>
        <iframe
          width="810"
          height="465"
          src={video?.src}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div className="flex-row align-center space-between full-width">
        <h3>{video?.title}</h3>
        <div className="flex-row">
          <LikeButton video={video} />
          <WatchLaterButton video={video} /> <PlaylistButton video={video} />{" "}
        </div>
      </div>
    </div>
  );
};

export default SingleVideoPage;
