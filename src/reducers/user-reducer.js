import { createSlice } from "@reduxjs/toolkit";

const loginUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = loginUser
  ? loginUser
  : {
      userName: null,
      email: null,
      password: null,
      gender: null,
      isAdmin: null,
      isVip: null,
      playlistsCount: null,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile(state, action) {
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
