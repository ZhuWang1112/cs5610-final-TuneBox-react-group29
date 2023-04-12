import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../reducers/playlist-reducer";
import followReducer from "../reducers/follow-reducer";
import commentReducer from "../reducers/comment-reducer";
import likedSongReducer from "../reducers/like-reducer";
import authReducer from "../reducers/auth-reducers";
import profileReducers from "../reducers/profile-reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    playlist: playlistReducer,
    follow: followReducer,
    comment: commentReducer,
    likedSong: likedSongReducer,
    profile: profileReducers,
  },
});

export default store;