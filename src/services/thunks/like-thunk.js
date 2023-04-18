import { createAsyncThunk } from "@reduxjs/toolkit";
import { findCurrentUserSongs } from "../songPlaylist-service";

export const findCurrentUserSongsThunk = createAsyncThunk(
  "profile/findCurrentUserSongsThunk",
  async () => {
    const songs = await findCurrentUserSongs();
    return songs;
  }
);
