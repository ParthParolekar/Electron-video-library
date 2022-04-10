import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useUser } from "../../Context/UserContext/UserContext";

const WatchLaterButton = ({ video }) => {
  const [authState] = useAuth();
  const [userState, userDispatch] = useUser();
  const navigate = useNavigate();

  const addToWatchLater = async () => {
    if (authState.encodedToken === null) {
      navigate("/login");
    } else {
      try {
        await axios
          .post(
            "/api/user/watchlater",
            {
              video,
            },
            {
              headers: { authorization: authState.encodedToken },
            }
          )
          .then((res) => {
            userDispatch({
              type: "WATCH_LATER_HANDLER",
              payload: res.data.watchlater,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeFromWatchLater = async () => {
    if (authState.encodedToken === null) {
      navigate("/login");
    } else {
      try {
        await axios
          .delete(
            `/api/user/watchlater/${video._id}`,
            {
              headers: { authorization: authState.encodedToken },
            },
            {
              video,
            }
          )
          .then((res) => {
            console.log(res.data);
            userDispatch({
              type: "WATCH_LATER_HANDLER",
              payload: res.data.watchlater,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return !userState.watchlater.find((item) => item._id === video._id) ? (
    <button className="btn btn-primary text-btn" onClick={addToWatchLater}>
      WATCH LATER
    </button>
  ) : (
    <button className="btn btn-primary text-btn" onClick={removeFromWatchLater}>
      REMOVE FROM WATCHLATER
    </button>
  );
};

export default WatchLaterButton;
