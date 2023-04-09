import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../like-service";

export const updateLikeThunk = createAsyncThunk(
  "profile/likeSongs",
  async (likeObj) => {
    const response = await service.updateLike(likeObj);
    return response;
  }
);
