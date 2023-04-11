import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../playlist-service";
import { updateUser } from "../user-service";

export const findPlaylistsThunk = createAsyncThunk(
  "profile/Playlists",
  async (userId) => await service.findPlaylists(userId)
);

export const deletePlaylistThunk = createAsyncThunk(
  "profile/deletePlaylist",
  async (playlistId) => {
    const updatedPlaylists = await service.deletePlaylist(playlistId);
    return updatedPlaylists;
  }
);

export const createPlaylistThunk = createAsyncThunk(
  "profile/createPlaylist",
  async (obj) => {
    const newPlaylist = await service.createPlaylist(obj.playlist);
    // increase playlistCount in user table
    updateUser({ _id: obj.playlist.user, playlistsCount: obj.cnt });
    return newPlaylist;
  }
);

export const findPlaylistDetailsThunk = createAsyncThunk(
  "profile/findPlaylistDetails",
  async (playlistId) => {
    const playlist = await service.findPlaylistDetails(playlistId);
    return playlist;
  }
);

export const findSongsThunk = createAsyncThunk(
  "profile/findSongsThunk",
  async (playlistId) => {
    const songs = await service.findSongs(playlistId);
    return songs;
  }
);
