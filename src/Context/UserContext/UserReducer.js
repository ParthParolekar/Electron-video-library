export const initialState = {
  playlistModal: { showPlaylistModal: false, videoToAdd: null },
  likedVideos: [],
  watchlater: [],
  playlists: [],
  history: [],
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "LIKE_HANDLER":
      return { ...state, likedVideos: action.payload };
    case "WATCH_LATER_HANDLER":
      return { ...state, watchlater: action.payload };
    case "PLAYLIST_HANDLER":
      return { ...state, playlists: action.payload };
    case "HISTORY_HANDLER":
      return { ...state, history: action.payload };
    case "PLAYLIST_VIDEO_HANDLER":
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist._id === action.payload._id
            ? {
                ...playlist,
                description: action.payload.description,
                title: action.payload.title,
                videos: action.payload.videos,
                _id: action.payload._id,
              }
            : playlist
        ),

        //   ...state.playlists.map(
        //     (playlist) =>
        // playlist._id === action.payload._id && {
        //   playlist: action.payload,
        // }
        //   ),
        //   ,
        // ],
      };
    case "PLAYLIST_MODAL_HANDLER":
      return {
        ...state,
        playlistModal: {
          ...state.playlistModal,
          showPlaylistModal: action.payload,
        },
      };
    case "PLAYLIST_VIDEO_TO_ADD":
      return {
        ...state,
        playlistModal: {
          ...state.playlistModal,
          videoToAdd: action.payload,
        },
      };
    default:
      return state;
  }
};
