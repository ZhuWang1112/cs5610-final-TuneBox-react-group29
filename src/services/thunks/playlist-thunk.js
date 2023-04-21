import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../playlist-service";
import { updateUserNonAdmin } from "../user-service";
import { findSongsByPlaylistId } from "../songPlaylist-service";
import * as searchLocalService from "../search-localAPI-service";

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
    updateUserNonAdmin({ _id: obj.playlist.user, playlistsCount: obj.cnt });
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

export const searchPlaylistThunk = createAsyncThunk(
    "api/local-playlists",
    async (name) => {
        const response = await searchLocalService.searchPlaylists(name)
        console.log("playlist-thunk: ", response);
        return response;
    }
);