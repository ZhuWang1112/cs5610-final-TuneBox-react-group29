import { createSlice } from "@reduxjs/toolkit";
import { findProfileThunk } from "../services/thunks/profile-thunk";

const profileSlice = createSlice({
  name: "profile",
  initialState: { currentProfile: null },
  reducers: {
    updateProfile(state, action) {
      state.currentProfile = {
        ...state.currentProfile,
        ...action.payload,
      };
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
