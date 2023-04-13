import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../like-service";

export const updateLikeThunk = createAsyncThunk(
  "profile/likeSongs",
  async (likeObj) => {
    const response = await service.updateLike(likeObj);
    return response;
  }
);

export const initLikeThunk = createAsyncThunk(
    `likedSongs`,
    async (user_id) => {
        // console.log("obj, ", user_id);
        const response = await service.initLikedList(user_id);
        return response;
    }
);


export const findProfileSongsThunk = createAsyncThunk(
  "profile/findProfileSongsThunk",
  async (uid) => {
    const songs = await service.findLikedSongs(uid);
    return songs;
  }
);

;
