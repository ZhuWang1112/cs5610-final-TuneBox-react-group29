import axios from "axios";
const SONG_PLAYLIST_API = process.env.REACT_APP_API_BASE + "/api/songPlaylist";

export const findSongsByPlaylistId = async (pid) => {
  const response = await axios.get(`${SONG_PLAYLIST_API}/${pid}`);
  return response.data;
};

export const deleteSongPlaylist = async (userId, songId) => {
  const response = await axios.delete(
    `${SONG_PLAYLIST_API}/${userId}/${songId}`
  );
  return response.data;
};

export const findSongNumberByUserId = async (userId) => {
  const response = await axios.get(`${SONG_PLAYLIST_API}/songNumber/${userId}`);
  return response.data;
};

export const createSongPlaylist = async (userId, songId, playlistId) => {
  const response = await axios.post(SONG_PLAYLIST_API, {
    userId: userId,
    songId: songId,
    playlistId: playlistId,
  });
  return response.data;
};

export const findCurrentUserSongs = async () => {
  const response = await axios.get(`${SONG_PLAYLIST_API}`);
  return response.data;
};

export const findLikedSongsByUser = async (uid) => {
  const response = await axios.get(`${SONG_PLAYLIST_API}/user/${uid}`);
  return response.data;
};

export const updateSongPlaylist = async (obj) => {
  const response = await axios.put(`${SONG_PLAYLIST_API}`, obj);
  return response.data;
};