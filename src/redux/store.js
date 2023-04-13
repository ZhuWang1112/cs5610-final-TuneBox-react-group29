import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../reducers/playlist-reducer";
import followReducer from "../reducers/follow-reducer";
import likedSongReducer from "../reducers/like-reducer";
import authReducer from "../reducers/auth-reducers";
import profileReducers from "../reducers/profile-reducer";
// import userReducers from "../reducers/user-reducer";
import hotReducer from "../reducers/hot-reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    playlist: playlistReducer,
    follow: followReducer,
    likedSong: likedSongReducer,
    profile: profileReducers,
    // user: userReducers,
    hot: hotReducer,
  },
});

export default store;