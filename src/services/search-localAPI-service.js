import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
    withCredentials: true,
});
const API_BASE = process.env.REACT_APP_API_BASE;

export const searchArtists = async (name) => {
  const response = await api.post(`${API_BASE}/api/local-artists`, {
    name: name,
  });
  return response.data;
};

export const searchPlaylists = async (name) => {
  const response = await api.post(`${API_BASE}/api/local-playlists`, {
    name: name,
  });
  return response.data;
};

export const searchSongs = async (name) => {
  const response = await api.post(`${API_BASE}/api/local-songs`, {
    name: name,
  });
  return response.data;
};

