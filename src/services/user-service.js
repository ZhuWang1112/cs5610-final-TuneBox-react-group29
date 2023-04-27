import axios from "axios";
console.log("process.env.REACT_APP_API_BASE", process.env.REACT_APP_API_BASE);
const USER_API = process.env.REACT_APP_API_BASE + "/api/users";
axios.defaults.withCredentials = true;
export const findUser = async (userId) => {
  const response = await axios.get(`${USER_API}/${userId}`);
  return response.data;
};

export const findCurrentUser = async () => {
  const response = await axios.get(`${USER_API}/currentUser`);
  if (response.data === null) {
    localStorage.clear();
  }
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