import axios from "axios";
const USER_API = "http://localhost:4000/api/users";

export const findUser = async (userId) => {
  const response = await axios.get(`${USER_API}/${userId}`);
  return response.data;
};

export const findCurrentUser = async () => {
  const response = await axios.get(`${USER_API}/currentUser`);
  return response.data;
};

export const updateUserNonAdmin = async (user) => {
  const response = await axios.put(`${USER_API}/${user._id}`, user);
  return response.data;
};

export const checkLogin = async (user) => {
  const response = await axios.get(`${USER_API}/checkLogin/${user._id}`);
  return response.data;
}