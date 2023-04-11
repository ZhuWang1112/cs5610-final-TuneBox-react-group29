import axios from "axios";
const PLAYLIST_API = "http://localhost:4000/api/playlists";
const PLAYLISTDEFAULT_API = "http://localhost:4000/api/playlistsdefault";

export const createPlaylist = async (playlist) => {
  const response = await axios.post(PLAYLIST_API, playlist);
  return response.data;
};

export const findPlaylists = async (userId) => {
  // console.log("search");
  const response = await axios.get(`${PLAYLIST_API}/${userId}`);
  const playlists = response.data;
  return playlists;
};

export const deletePlaylist = async (playlistId) => {
  const response = await axios.delete(`${PLAYLIST_API}/${playlistId}`);
  console.log("response./dat", response.data);
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

export const checkSongs = async (userId, playlistId) => {
  console.log(`${PLAYLIST_API}/${userId}/${playlistId}`);
  const response = await axios.get(`${PLAYLIST_API}/${userId}/${playlistId}`);
  return response.data;
};

export const findDefaultPlaylistByUser = async (userId) => {
  const response = await axios.get(`${PLAYLISTDEFAULT_API}/${userId}`);
  console.log("response in finddefault: ", response.data);
  return response.data;
};