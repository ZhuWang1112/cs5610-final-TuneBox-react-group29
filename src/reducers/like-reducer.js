import { createSlice } from "@reduxjs/toolkit";
import { findCurrentUserSongsThunk } from "../services/thunks/like-thunk";

const likeSlice = createSlice({
  name: "likedSongs",
  initialState: { likedSongs: [] },
  reducers: {
    updateLikeSong(state, action) {
      state.likedSongs = action.payload;
    },

    deleteLikeSong(state, action) {
      // delete the song from likedSongs
      const apiSongId = action.payload;
      state.likedSongs = state.likedSongs.filter(
        (song) => song.apiSongId !== apiSongId
      );
    },

    addLikeSong(state, action) {
      const { _id, apiSongId } = action.payload;
      state.likedSongs = [...state.likedSongs, action.payload];
    },
  },
  extraReducers: {
    [findCurrentUserSongsThunk.fulfilled]: (state, { payload }) => {
      state.likedSongs = payload;
    },
  },
});

export const { updateLikeSong, deleteLikeSong, addLikeSong } =
  likeSlice.actions;
export default likeSlice.reducer;
