import { createSlice } from "@reduxjs/toolkit";

const playlistData = [
  { _id: 1, name: "Default playlist", desc: "", songs: [1, 2] },
  { _id: 2, name: "playlist2", desc: "", songs: [4, 3] },
  { _id: 3, name: "playlist3", desc: "", songs: [] },
];

const playlistSlice = createSlice({
  name: "playlist",
  initialState: playlistData,
  reducers: {
    createPlaylist(state, action) {
      state.push(action.payload);
    },

    deletePlaylist(state, action) {
      const index = state.findIndex(
        (playlist) => playlist._id === action.payload
      );
      state.splice(index, 1);
    },

    updatePlaylist(state, action) {
      const index = state.findIndex(
        (playlist) => playlist._id === action.payload._id
      );
      return [
        ...state.slice(0, index),
        action.payload,
        ...state.slice(index + 1),
      ];
    },
  },
});

export const { createPlaylist, deletePlaylist, updatePlaylist } =
  playlistSlice.actions;
export default playlistSlice.reducer;
