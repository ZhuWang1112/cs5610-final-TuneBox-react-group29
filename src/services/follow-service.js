import axios from "axios";
const FOLLOW_API = process.env.REACT_APP_API_BASE + "/api/follows";
const FOLLOWOBJ_API = process.env.REACT_APP_API_BASE + "/api/followObjects";
axios.defaults.withCredentials = true;
export const findFollowees = async (userId) => {
  const response = await axios.get(`${FOLLOWOBJ_API}/${userId}`);
  return response.data;
};

export const updateFollowee = async (followObj) => {
  const response = await axios.put(
    `${FOLLOW_API}/${followObj.user}`,
    followObj
  );
  return response.data;
};

export const findFolloweeIds = async (userId) => {
  const response = await axios.get(`${FOLLOW_API}/${userId}`);
  return response.data;
};

export const checkFollowees = async (loginId, targetId) => {
  const response = await axios.get(`${FOLLOW_API}/${loginId}/${targetId}`);
  return response.data;
};



export const initFollowList = async (user_id) => {
  const response = await axios.post(`${FOLLOW_API}/${user_id}`);
  return response.data;
};