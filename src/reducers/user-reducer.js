import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
    email: null,
    password: null,
    gender: null,
    isAdmin: null,
    isVip: null,
    playlistsCount: null,
  },
  reducers: {
    updateProfile(state, action) {
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
});

export const { updateProfile } = userSlice.actions;
export default userSlice.reducer;
