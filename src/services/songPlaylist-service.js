import axios from "axios";
const SONG_PLAYLIST_API = "http://localhost:4000/api/songPlaylist";

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