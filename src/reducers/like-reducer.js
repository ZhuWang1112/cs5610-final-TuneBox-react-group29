import { createSlice } from "@reduxjs/toolkit";
import { updateLikeThunk } from "../services/thunks/like-thunk";
import { findSongsThunk } from "../services/thunks/playlist-thunk";

const likeSlice = createSlice({
  name: "likedSongs",
  initialState: { songs: [] },
  reducers: {},
  extraReducers: {
    [updateLikeThunk.fulfilled]: (state, { payload }) => {
      state.songs = payload;
    },
    [findSongsThunk.fulfilled]: (state, { payload }) => {
      state.songs = payload;
    },
  },
});

export default likeSlice.reducer;
