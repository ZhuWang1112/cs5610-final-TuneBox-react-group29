import { createSlice } from "@reduxjs/toolkit";
import {
  findPlaylistsThunk,
  createPlaylistThunk,
  deletePlaylistThunk,
  searchPlaylistThunk,
} from "../services/thunks/playlist-thunk";
import { searchArtistThunk } from "../services/thunks/artist-thunk";

const playlistSlice = createSlice({
  name: "playlist",
  // initialState: { playlists: [] },
  initialState: {
    _id: null,
    playListName: "",
    description: "",
    songs: [],
    img: "",
    __v: 0,
    isDefault: true,
    rating: 0,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [findPlaylistsThunk.pending]: (state) => {
      state.playlists = [];
    },
    [findPlaylistsThunk.fulfilled]: (state, { payload }) => {
      state.playlists = payload;
    },
    [deletePlaylistThunk.fulfilled]: (state, { payload }) => {
      state.playlists = payload;
    },
    [searchPlaylistThunk.fulfilled]: (state, action) => {
      state.playListName = action.payload;
    },
  },
});

export default playlistSlice.reducer;
