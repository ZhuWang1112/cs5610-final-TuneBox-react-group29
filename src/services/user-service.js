import axios from "axios";
const USER_API = "http://localhost:4000/api/users";

export const findUser = async (userId) => {
  const response = await axios.get(`${USER_API}/${userId}`);
  return response.data;
};