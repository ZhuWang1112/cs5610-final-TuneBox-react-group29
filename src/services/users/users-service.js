import axios from "axios";
const USERS_API_URL = process.env.REACT_APP_API_BASE + "/api/users";

const api = axios.create({
    withCredentials: true,
});

export const findAllUsers = async () => {
    const response = await axios.get(USERS_API_URL);
    return response.data;
};

export const findUserById = async (id) => {
  const response = await axios.get(`${USERS_API_URL}/${id}`);
  return response.data;
};

export const createUser = (user) => {
  return axios.post(USERS_API_URL, user);
};

export const updateUser = async (newUser) => {
  await axios.put(`${USERS_API_URL}/admin/${newUser._id}`, newUser);
  return newUser;
};

export const deleteUser = (id) => {
    return axios.delete(`${USERS_API_URL}/${id}`);
};

export const login = async (user) => {
  const loginUser = await api.post(`${USERS_API_URL}/login`, user);
  return loginUser;
};

export const logout = () => {
    return api.post(`${USERS_API_URL}/logout`);
};

export const register = (user) => {
    return api.post(`${USERS_API_URL}/register`, user);
};

