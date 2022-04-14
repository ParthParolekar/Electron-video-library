import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../components";
import { useAuth } from "../../Context";

const SinglePlaylist = () => {
  const { playlistId } = useParams();
  const [authState] = useAuth();
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get(`/api/user/playlists/${playlistId}`, {
          headers: { authorization: authState.encodedToken },
        })
        .then((res) => setPlaylistVideos(res.data.playlist));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [playlistId]);
  return (
    <section className="product-list">
      <div className="product-list-title">
        <h3>{playlistVideos.title}</h3>
      </div>
      <div className="card-container flex-row align-center justify-center flex-wrap">
        {loading && <h3>Loading...</h3>}
        {!loading && playlistVideos.videos?.length === 0 && (
          <h3>No Videos in this playlist</h3>
        )}
        {playlistVideos.videos?.map((video) => (
          <Card
            key={video._id}
            video={video}
            description={video.discount}
            thumbnail={video.thumbnail}
            title={video.title}
            creator={video.creator}
          />
        ))}
      </div>
    </section>
  );
};

export default SinglePlaylist;
