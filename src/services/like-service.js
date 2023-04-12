import axios from "axios";
import { findSongs } from "./song-service.js";
const LIKEDSONGS_API = "http://localhost:4000/api/likedSongs";

export const updateLike = async (likeObj) => {
  console.log("obj: ", likeObj);
  const response = await axios.put(
    `${LIKEDSONGS_API}/${likeObj.user}`,
    likeObj
  );
  console.log("response.data: ", response.data);

  //   const songObjs = await findSongs(response.data.likedSongs);
  //   console.log(":, songObjs", songObjs);
  return response.data;
};


export const initLikedList = async (user_id) => {
  const response = await axios.post(`${LIKEDSONGS_API}/${user_id}`);
  return response.data;
};

