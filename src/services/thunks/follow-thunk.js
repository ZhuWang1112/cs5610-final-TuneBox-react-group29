import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../follow-service";

export const findFolloweeThunk = createAsyncThunk(
  "profile/findFolloweeThunk",
  async (userId) => await service.findFollowees(userId)
);

export const updateFolloweeThunk = createAsyncThunk(
  "profile/updateFolloweeThunk",
  async (followeeObj) => {
    const response = await service.updateFollowee(followeeObj);
    return response;
  }
);

export const checkFolloweeThunk = createAsyncThunk(
  "profile/checkFolloweeThunk",
  async (obj) => {
    console.log("obj, ", obj);
    const response = await service.checkFollowees(obj.loginUser, obj.uid);
    return response;
  }
);


export const initFollowThunk = createAsyncThunk(
    `follows`,
    async (user_id) => {
        // console.log("obj, ", user_id);
        const response = await service.initFollowList(user_id);
        return response;
    }
);