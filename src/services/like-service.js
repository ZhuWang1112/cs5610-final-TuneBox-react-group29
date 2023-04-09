import axios from "axios";
const PLAYLIST_API = "http://localhost:4000/api/likedSongs";

export const updateLike = async (userId, obj) => {
  const response = await axios.put(`${PLAYLIST_API}/${userId}`, obj);
  return response.data;
};
