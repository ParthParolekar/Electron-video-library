import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, ClearHistoryButton } from "../../components";
import { useUser, useAuth } from "../../Context";

const History = () => {
  const [authState] = useAuth();
  const [userState] = useUser();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user/history", {
        headers: { authorization: authState.encodedToken },
      })
      .then((res) => setHistory(res.data.history))
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  }, [userState.history]);

  return (
    <section className="product-list">
      <div className="product-list-title">
        <h3>History</h3>
        <ClearHistoryButton />
      </div>
      <div className="card-container flex-row align-center justify-center flex-wrap">
        {loading && <h3>Loading...</h3>}
        {!loading && history?.length === 0 && <h3>No Videos in history</h3>}
        {history.map((video) => (
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

export default History;
