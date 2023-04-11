import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../comment-service";

export const findCommentsThunk = createAsyncThunk(
  "profile/findCommentThunk",
  async (userId) => {
    const comments = await service.findComments(userId);
    return comments;
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "profile/deleteCommentThunk",
  async (cid) => {
    const response = await service.deleteComment(cid);
    return cid;
  }
);
