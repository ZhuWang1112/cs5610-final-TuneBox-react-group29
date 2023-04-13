import { createSlice } from "@reduxjs/toolkit";
import { updateLikeThunk } from "../services/thunks/like-thunk";
import {
  findSongsThunk,
  checkSongsThunk,
} from "../services/thunks/playlist-thunk";
import { findProfileSongsThunk } from "../services/thunks/like-thunk";
import { findSongsPlaylistThunk } from "../services/thunks/playlist-thunk";
const likeSlice = createSlice({
  name: "likedSongs",
  initialState: { songs: [], checkSong: [], profileSongs: null },
  reducers: {
    updateLikeSong(state, action) {
      const id = action.payload;
      console.log("updateLikeSong: ", [
        ...state.checkSong.slice(0, id),
        !state.checkSong[id],
        ...state.checkSong.slice(id + 1),
      ]);
      state.checkSong = [
        ...state.checkSong.slice(0, id),
        !state.checkSong[id],
        ...state.checkSong.slice(id + 1),
      ];
    },
    deleteLikeSong(state, action) {
      const id = action.payload;
      console.log("deleted id", id);
      // state.songs = state.songs.splice(id, 1);
      // state.checkSong = state.checkSong.splice(id, 1);
      state.songs = [...state.songs.slice(0, id), ...state.songs.slice(id + 1)];
      state.checkSong = [
        ...state.checkSong.slice(0, id),
        ...state.checkSong.slice(id + 1),
      ];
    },
    updateProfileSongs(state, action) {
      const songsToBeDeleted = action.payload.map((s) => s.toString());
      state.profileSongs = state.profileSongs.filter((s) =>
        songsToBeDeleted.includes(s._id.toString())
      );
    },
  },
  extraReducers: {
    [updateLikeThunk.fulfilled]: (state, { payload }) => {
      state.songs = payload;
    },
    [findSongsThunk.fulfilled]: (state, { payload }) => {
      state.songs = payload;
    },
    [findSongsPlaylistThunk.fulfilled]: (state, { payload }) => {
      state.songs = payload;
    },
    [findProfileSongsThunk.fulfilled]: (state, { payload }) => {
      state.profileSongs = payload;
    },
    [checkSongsThunk.fulfilled]: (state, { payload }) => {
      console.log("payload in checkSongsThunk, ", payload);
      state.songs = payload.songs;
      state.checkSong = payload.checkSong;
    },
  },
});

export const { updateLikeSong, deleteLikeSong, updateProfileSongs } =
  likeSlice.actions;
export default likeSlice.reducer;
