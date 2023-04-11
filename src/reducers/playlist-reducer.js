import { createSlice } from "@reduxjs/toolkit";
import {
  findPlaylistsThunk,
  createPlaylistThunk,
  deletePlaylistThunk
} from "../services/thunks/playlist-thunk";

const playlistSlice = createSlice({
  name: "playlist",
  initialState: { playlists: [] },
  reducers: {
    createPlaylist(state, action) {
      // state.push(action.payload);
    },

    deletePlaylist(state, action) {
      // const index = state.findIndex(
      //   (playlist) => playlist._id === action.payload
      // );
      // state.playlistData.splice(index, 1);
    },

    updatePlaylist(state, action) {
      // const index = state.playlists.findIndex(
      //   (playlist) => playlist._id === action.payload._id
      // );
      // console.log([
      //   ...state.playlists.slice(0, index),
      //   action.payload,
      //   ...state.playlists.slice(index + 1),
      // ]);
    },
  },
  extraReducers: {
    [findPlaylistsThunk.pending]: (state) => {
      state.playlists = [];
    },
    [findPlaylistsThunk.fulfilled]: (state, { payload }) => {
      state.playlists = payload;
      console.log(state.playlists);
    },
    [createPlaylistThunk.fulfilled]: (state, { payload }) => {
      state.playlists.push(payload);
    },
    [deletePlaylistThunk.fulfilled]: (state, { payload }) => {
      state.playlists = payload;
    },
  },
});

export const { updatePlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;
