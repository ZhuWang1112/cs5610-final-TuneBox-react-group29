import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../reducers/playlist-reducer";
import followReducer from "../reducers/follow-reducer";
import likedSongReducer from "../reducers/like-reducer";
import authReducer from "../reducers/auth-reducers";
import profileReducer from "../reducers/profile-reducer";
import userReducer from "../reducers/user-reducer.js";
import hotReducer from "../reducers/hot-reducer";
import artistReducer from "../reducers/artist-reducer";
import currentTrackReducer from "../reducers/currentTrack-reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    playlist: playlistReducer,
    follow: followReducer,
    likedSong: likedSongReducer,
    profile: profileReducer,
    user: userReducer,
    hot: hotReducer,
    artist: artistReducer,
    currentTrack: currentTrackReducer,
  },
});

export default store;