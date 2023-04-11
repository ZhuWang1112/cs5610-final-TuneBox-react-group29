import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../playlist-service";
import { updateUser } from "../user-service";
import { findSongsByPlaylistId } from "../songPlaylist-service";

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
  async (playlist) => {
    const songs = await service.findSongs(playlist);
    return songs;
  }
);

export const checkSongsThunk = createAsyncThunk(
  "profile/checkSongsThunk",
  async ({ user, pid }) => {
    const response = await service.checkSongs(user, pid);
    console.log("checkSongsThunk response, ", response);
    return response;
  }
);

export const findSongsPlaylistThunk = createAsyncThunk(
  "profile/findSongsPlaylistThunk",
  async (pid) => {
    const songPlaylist = await findSongsByPlaylistId(pid);
    return songPlaylist;
  }
);