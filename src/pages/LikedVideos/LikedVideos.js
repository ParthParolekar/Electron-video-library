import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "../../components";
import { useUser, useAuth } from "../../Context";

const LikedVideos = () => {
  const [authState] = useAuth();
  const [userState] = useUser();
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user/likes", {
        headers: { authorization: authState.encodedToken },
      })
      .then((res) => setLikedVideos(res.data.likes))
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  }, [userState.likedVideos]);

  return (
    <section className="product-list">
      <div className="product-list-title">
        <h3>Liked Videos</h3>
      </div>
      <div className="card-container flex-row align-center justify-center flex-wrap">
        {loading && <h3>Loading...</h3>}
        {!loading && likedVideos.length === 0 && (
          <h3>No Items in the wishlist</h3>
        )}
        {likedVideos.map((video) => (
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

export default LikedVideos;
