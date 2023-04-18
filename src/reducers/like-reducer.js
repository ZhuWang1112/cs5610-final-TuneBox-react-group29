import { createSlice } from "@reduxjs/toolkit";
// import { findProfileSongsThunk } from "../services/thunks/like-thunk";
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
      const _id = action.payload; // _id in song schema of local database
      state.likedSongs = state.likedSongs.filter((song) => song._id !== _id);
    },

    addLikeSong(state, action) {
      const { _id, apiSongId } = action.payload;
      console.log("addLikeSong", [...state.likedSongs, action.payload]);
      state.likedSongs = [...state.likedSongs, action.payload];
    },

    // updateProfileSongs(state, action) {
    //   const songsToKeep = action.payload.map((s) => s.toString());
    //   state.profileSongs = state.profileSongs.filter((s) =>
    //     songsToKeep.includes(s._id.toString())
    //   );
    // },
    // deleteProfileSongs(state, action) {
    //   state.profileSongs = state.profileSongs.filter(
    //     (song) => song._id !== action.payload
    //   );
    // },
  },
  extraReducers: {
    // [findProfileSongsThunk.fulfilled]: (state, { payload }) => {
    //   state.profileSongs = payload;
    // },
    // [checkSongsThunk.fulfilled]: (state, { payload }) => {
    //   console.log("payload in checkSongsThunk, ", payload);
    //   state.songs = payload.songs;
    //   state.checkSong = payload.checkSong;
    // },
    [findCurrentUserSongsThunk.fulfilled]: (state, { payload }) => {
      console.log("payload in findCurrentUserSongsThunk, ", payload);
      state.likedSongs = payload;
    },
  },
});

export const {
  updateLikeSong,
  deleteLikeSong,
  // updateProfileSongs,
  // deleteProfileSongs,
  addLikeSong,
} = likeSlice.actions;
export default likeSlice.reducer;
