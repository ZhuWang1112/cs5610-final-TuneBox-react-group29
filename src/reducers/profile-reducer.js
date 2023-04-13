import { createSlice } from "@reduxjs/toolkit";
import { findProfileThunk } from "../services/thunks/profile-thunk";

// const loginUser = JSON.parse(localStorage.getItem("currentUser"));

// const initialState = loginUser
//   ? loginUser
//   : {
//       userName: null,
//       email: null,
//       password: null,
//       gender: null,
//       isAdmin: null,
//       isVip: null,
//       playlistsCount: null,
//     };

const profileSlice = createSlice({
  name: "profile",
  initialState: { currentProfile: null },
  reducers: {
    updateProfile(state, action) {
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
  extraReducers: {
    [findProfileThunk.fulfilled]: (state, { payload }) => {
      state.currentProfile = payload;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
