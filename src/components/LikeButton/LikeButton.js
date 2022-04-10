import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { useUser } from "../../Context/UserContext/UserContext";

const LikeButton = ({ video }) => {
  const [authState] = useAuth();
  const [userState, userDispatch] = useUser();
  const navigate = useNavigate();

  const likeVideo = async () => {
    if (authState.encodedToken === null) {
      navigate("/login");
    } else {
      try {
        await axios
          .post(
            "/api/user/likes",
            {
              video,
            },
            {
              headers: { authorization: authState.encodedToken },
            }
          )
          .then((res) => {
            userDispatch({
              type: "LIKE_HANDLER",
              payload: res.data.likes,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const unlikeVideo = async () => {
    if (authState.encodedToken === null) {
      navigate("/login");
    } else {
      try {
        await axios
          .delete(
            `/api/user/likes/${video._id}`,
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
              type: "LIKE_HANDLER",
              payload: res.data.likes,
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return !userState.likedVideos.find((item) => item._id === video._id) ? (
    <button className="btn btn-primary text-btn" onClick={likeVideo}>
      LIKE
    </button>
  ) : (
    <button className="btn btn-primary text-btn" onClick={unlikeVideo}>
      UNLIKE
    </button>
  );
};

export default LikeButton;
