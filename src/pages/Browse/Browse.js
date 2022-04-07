import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "../../components";

const Browse = () => {
  const [videoList, setVideoList] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      axios
        .get("/api/videos")
        .then((response) => setVideoList(response.data.videos));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <div>
      <section className="product-list">
        <div className="product-list-title filter-btn-container">
          <h3>Browse</h3>
        </div>
        <div className="card-container flex-row align-center justify-center flex-wrap">
          {loading && <h3>Loading...</h3>}
          {!loading && videoList.length === 0 && <h3>No results found</h3>}
          {videoList.map((video) => (
            <Card
              key={video._id}
              description={video.discount}
              thumbnail={video.thumbnail}
              title={video.title}
              creator={video.creator}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Browse;
