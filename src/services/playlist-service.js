import axios from "axios";
import { updateUserNonAdmin } from "./user-service";
const PLAYLIST_API = process.env.REACT_APP_API_BASE + "/api/playlists";
const PLAYLISTDEFAULT_API = process.env.REACT_APP_API_BASE + "/api/playlistsdefault";
axios.defaults.withCredentials = true;
export const createPlaylist = async (obj) => {
  const response = await axios.post(PLAYLIST_API, obj.playlist);
  // increase playlistCount in user table
  updateUserNonAdmin({ _id: obj.playlist.user, playlistsCount: obj.cnt });
  return response.data;
};

export const findPlaylists = async (userId) => {
  const response = await axios.get(`${PLAYLIST_API}/${userId}`);
  const playlists = response.data;
  return playlists;
};

export const deletePlaylist = async (playlistObj) => {
  const response = await axios.delete(`${PLAYLIST_API}`, {
    data: {
      playlistObj,
    },
  });
  return response.data;
};

export const findPlaylistDetails = async (playlistId) => {
  const response = await axios.get(`${PLAYLIST_API}/details/${playlistId}`);
  return response.data;
};

export const findSongs = async (playlistId) => {
  const response = await axios.get(`${PLAYLIST_API}/songs/${playlistId}`);
  return response.data;
};

export const updatePlaylist = async (playlist) => {
  const response = await axios.put(`${PLAYLIST_API}/${playlist._id}`, playlist);
  return response.data;
};

export const findDefaultPlaylistByUser = async (userId) => {
  const response = await axios.get(`${PLAYLISTDEFAULT_API}/${userId}`);
  return response.data;
};