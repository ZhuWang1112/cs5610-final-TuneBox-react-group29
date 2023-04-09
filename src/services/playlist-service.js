import axios from "axios";
const PLAYLIST_API = "http://localhost:4000/api/playlists";

export const createPlaylist = async (playlist) => {
  const response = await axios.post(PLAYLIST_API, playlist);
  return response.data;
};

export const findPlaylists = async (userId) => {
  console.log("search");
  const response = await axios.get(`${PLAYLIST_API}/${userId}`);
  const playlists = response.data;
  return playlists;
};

export const deletePlaylist = async (playlistId) => {
  const response = await axios.delete(`${PLAYLIST_API}/${playlistId}`);
  return response.data;
};

export const findPlaylistDetails = async (playlistId) => {
  console.log(`${PLAYLIST_API}/details/${playlistId}`);
  const response = await axios.get(`${PLAYLIST_API}/details/${playlistId}`);
  return response.data;
};
