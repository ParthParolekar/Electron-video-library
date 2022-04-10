export const initialState = { likedVideos: [], watchlater: [] };

export const userReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_HANDLER":
      return { ...state, likedVideos: action.payload };
    case "WATCH_LATER_HANDLER":
      return { ...state, watchlater: action.payload };
    default:
      return state;
  }
};
