import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../user-service";

export const updateProfileThunk = createAsyncThunk(
  "profile/updateProfileThunk",
  async (user) => {
    const response = await service.updateUser(user);
    return response;
  }
);
