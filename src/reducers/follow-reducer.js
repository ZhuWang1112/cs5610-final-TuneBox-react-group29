import { createSlice } from "@reduxjs/toolkit";

const followData = [
  { _id: 1, name: "shutong", img: "profile-avatar.jpeg", playlistNum: 2 },
  { _id: 2, name: "dtt", img: "profile-avatar.jpeg", playlistNum: 3 },
  { _id: 3, name: "cst", img: "profile-avatar.jpeg", playlistNum: 4 },
];

const followSlice = createSlice({
  name: "follow",
  initialState: followData,
  reducers: {
    createFollow(state, action) {
      const newFollow = {
        _id: action.payload,
        name: "random",
        img: "profile-avatar.jpeg",
        playlistNum: 0,
      };
      state.push(newFollow);
    },

    deleteFollow(state, action) {
      const index = state.findIndex(
        (playlist) => playlist._id === action.payload
      );
      state.splice(index, 1);
    },
  },
});

export const { createFollow, deleteFollow } = followSlice.actions;
export default followSlice.reducer;
