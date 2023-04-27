import axios from "axios";
axios.defaults.withCredentials = true;
const SONG_API = process.env.REACT_APP_API_BASE + "/api/songs";

export const findSongs = async (songList) => {
  const response = await axios.get(`${SONG_API}`, {
    params: {
      songId: songList,
    },
  });
  return response.data;
};

export const insertSongIfNotExist = async (song) => {
  const response = await axios.put(`${SONG_API}`, song);
  return response.data;
};
