import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../playlist-service";

export const findPlaylistsThunk = createAsyncThunk(
  "profile/Playlists",
  async (userId) => await service.findPlaylists(userId)
);

export const deletePlaylistThunk = createAsyncThunk(
  "profile/deletePlaylist",
  async (playlistId) => {
    await service.deletePlaylist(playlistId);
    return playlistId;
  }
);

export const createPlaylistThunk = createAsyncThunk(
  "profile/createPlaylist",
  async (playlist) => {
    const newPlaylist = await service.createPlaylist(playlist);
    return newPlaylist;
  }
);

export const findPlaylistDetailsThunk = createAsyncThunk(
  "profile/findPlaylistDetails",
  async (playlistId) => {
    const songs = await service.findPlaylistDetails(playlistId);
    return songs;
  }
);

export const findSongsThunk = createAsyncThunk(
  "profile/findSongsThunk",
  async (playlistId) => {
    const songs = await service.findSongs(playlistId);
    return songs;
  }
);
