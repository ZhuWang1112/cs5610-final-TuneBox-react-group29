import * as userService from "./users-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { findDefaultPlaylistByUser } from "../playlist-service";
import { updateUserNonAdmin, findCurrentUser } from "../user-service";
export const findAllUsersThunk = createAsyncThunk("users/findAll", async () => {
  const users = await userService.findAllUsers();
  return users;
});

export const findUserByIdThunk = createAsyncThunk(
  "users/findById",
  async (id) => {
    const response = await userService.findUserById(id);
    return response;
  }
);

export const findCurrentUserThunk = createAsyncThunk(
  "users/findCurrentUser",
  async () => {
    const response = await findCurrentUser();
    return response;
  }
);
// export const createUserThunk = createAsyncThunk("users/create", async (user) => {
//   const response = await userService.createUser(user);
//   return response.data;
// });

export const updateUserThunk = createAsyncThunk(
  "users/update",
  async (user) => {
    await userService.updateUser(user);
    return user;
  }
);

export const updateUserNonAdminThunk = createAsyncThunk(
  "users/update",
  async (user) => {
    await updateUserNonAdmin(user);
    return user;
  }
);

// export const deleteUserThunk = createAsyncThunk("users/delete", async (id) => {
//   await userService.deleteUser(id);
//   return id;
// });

export const loginThunk = createAsyncThunk("users/login", async (user) => {
  const response = await userService.login(user);
  if (response.data === null) {
    return null;
  }
  window.localStorage.setItem("currentUser", JSON.stringify(response.data));
  const defaultPlaylist = await findDefaultPlaylistByUser(response.data._id);
  window.localStorage.setItem(
    "defaultPlaylist",
    JSON.stringify(defaultPlaylist)
  );
  return response.data;
});

export const logoutThunk = createAsyncThunk("users/logout", async () => {
  window.localStorage.removeItem("currentUser");
  window.localStorage.removeItem("defaultPlaylist");
  await userService.logout();
});

export const registerThunk = createAsyncThunk(
  "users/register",
  async (user) => {
    const response = await userService.register(user);
    window.localStorage.setItem("currentUser", JSON.stringify(response.data));
    return response.data;
  }
);

