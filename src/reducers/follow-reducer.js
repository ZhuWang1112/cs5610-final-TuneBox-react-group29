import { createSlice } from "@reduxjs/toolkit";
import {
  findFolloweeThunk,
  updateFolloweeThunk,
  checkFolloweeThunk,
} from "../services/thunks/follow-thunk.js";

// const followData = [
//   { _id: 1, name: "shutong", img: "profile-avatar.jpeg", playlistNum: 2 },
//   { _id: 2, name: "dtt", img: "profile-avatar.jpeg", playlistNum: 3 },
//   { _id: 3, name: "cst", img: "profile-avatar.jpeg", playlistNum: 4 },
// ];

const followSlice = createSlice({
  name: "follow",
  initialState: { followeeList: [], checkFollowee: [], isSelf: false },
  reducers: {},
  extraReducers: {
    [findFolloweeThunk.fulfilled]: (state, { payload }) => {
      state.followeeList = payload;
    },
    [checkFolloweeThunk.fulfilled]: (state, { payload }) => {
      state.followeeList = payload.followeeList;
      state.checkFollowee = payload.checkFollowee;
      state.isSelf = payload.isSelf;
    },
    [updateFolloweeThunk.fulfilled]: (state, { payload }) => {
      if (state.isSelf) {
        state.followeeList = payload;
      }
    },
  },
});

export default followSlice.reducer;
