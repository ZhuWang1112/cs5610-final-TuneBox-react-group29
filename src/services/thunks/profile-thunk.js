import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../user-service";
import { updateUserNonAdmin } from "../user-service";

export const updateProfileThunk = createAsyncThunk(
  "profile/updateProfileThunk",
  async (user) => {
    const response = await service.updateUserNonAdmin(user);
    return response;
  }
);

export const findProfileThunk = createAsyncThunk(
  "profile/findProfileThunk",
  async (user) => {
    const response = await service.findUser(user);
    return response;
  }
);
