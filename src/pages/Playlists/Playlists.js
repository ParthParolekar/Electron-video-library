import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, PlaylistCard } from "../../components";
import { useUser, useAuth } from "../../Context";
import { CreatePlaylist } from "../../components";

const Playlists = () => {
  const [authState] = useAuth();
  const [userState] = useUser();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/user/playlists", {
        headers: { authorization: authState.encodedToken },
      })
      .then((res) => setPlaylists(res.data.playlists))
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  }, [userState.playlists]);

  return (
    <div className="flex-column jsutify-center align-center">
      <CreatePlaylist />

      <section className="product-list ">
        <div className="product-list-title">
          <h3 className={"mg-lg-top-bottom"}>Your Playlists</h3>
        </div>
        <div className="card-container flex-row align-center justify-center flex-wrap">
          {loading && <h3>Loading...</h3>}
          {!loading && playlists.length === 0 && <h3>No Playlist created</h3>}
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Playlists;
