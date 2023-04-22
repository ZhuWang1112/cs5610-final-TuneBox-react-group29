import { findUserById } from "../services/users/users-service";

const { createSlice } = require("@reduxjs/toolkit");
const {
  findAllUsersThunk,
  findUserByIdThunk,
  findCurrentUserThunk,
  createUserThunk,
  deleteUserThunk,
  updateUserThunk,
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk,
  updateUserNonAdminThunk,
} = require("../services/users/users-thunks");

const initialState = {
  currentUser: null,
  users: [],
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [updateUserThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [updateUserNonAdminThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [findUserByIdThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [findCurrentUserThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.currentUser = null;
    },
  },
});

export default usersSlice.reducer;
