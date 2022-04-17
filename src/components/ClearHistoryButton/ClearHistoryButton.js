import axios from "axios";
import React from "react";
import { useUser, useAuth } from "../../Context";

const ClearHistoryButton = () => {
  const [authState] = useAuth();
  const [, userDispatch] = useUser();

  const clearHistory = async () => {
    try {
      await axios
        .delete(`/api/user/history/all`, {
          headers: { authorization: authState.encodedToken },
        })
        .then((res) => {
          userDispatch({
            type: "HISTORY_HANDLER",
            payload: res.data.history,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="btn btn-primary" onClick={clearHistory}>
      CLEAR HISTORY
    </button>
  );
};

export default ClearHistoryButton;
