import axios from "axios";
const SONG_API = "http://localhost:4000/api/songs";

export const findSongs = async (songList) => {
  const response = await axios.get(`${SONG_API}`, {
    params: {
      songId: songList,
    },
  });
  return response.data;
};