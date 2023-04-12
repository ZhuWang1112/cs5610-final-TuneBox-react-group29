import axios from "axios";
const FOLLOW_API = "http://localhost:4000/api/follows";
const FOLLOWOBJ_API = "http://localhost:4000/api/followObjects";

export const findFollowees = async (userId) => {
  const response = await axios.get(`${FOLLOWOBJ_API}/${userId}`);
  return response.data;
};

export const updateFollowee = async (followObj) => {
  console.log("obj: ", followObj);
  const response = await axios.put(
    `${FOLLOW_API}/${followObj.user}`,
    followObj
  );
  console.log("response.data: ", response.data);
  return response.data;
};

export const findFolloweeIds = async (userId) => {
  const response = await axios.get(`${FOLLOW_API}/${userId}`);
  console.log("response.data in findFolloweeIds: ", response.data);
  return response.data;
};

export const checkFollowees = async (loginId, targetId) => {
  console.log(`${FOLLOW_API}/${loginId}/${targetId}`);
  const response = await axios.get(`${FOLLOW_API}/${loginId}/${targetId}`);
  return response.data;
};



export const initFollowList = async (user_id) => {
  const response = await axios.post(`${FOLLOW_API}/${user_id}`);
  return response.data;
};