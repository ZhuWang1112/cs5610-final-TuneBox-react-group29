import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import playlistReducer from "../reducers/playlist-reducer";
import followReducer from "../reducers/follow-reducer";
import commentReducer from "../reducers/comment-reducer";
import likedSongReducer from "../reducers/like-reducer";
import storage from "redux-persist/lib/storage";
import authReducer from "../reducers/auth-reducers";

const reducers = combineReducers({
  auth: authReducer,
  playlist: playlistReducer,
  follow: followReducer,
  comment: commentReducer,
  likedSong: likedSongReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "audioPlayer"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;