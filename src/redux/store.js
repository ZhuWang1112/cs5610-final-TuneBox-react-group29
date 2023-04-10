import { configureStore } from "@reduxjs/toolkit";
import playlistReducer from "../reducers/playlist-reducer";
import followReducer from "../reducers/follow-reducer";
import commentReducer from "../reducers/comment-reducer";
import authReducer from "../reducers/auth-reducers";
import storage from "redux-persist/lib/storage";



const store = configureStore({
    reducer: {
        auth: authReducer,
        playlist: playlistReducer,
        follow: followReducer,
        comment: commentReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;