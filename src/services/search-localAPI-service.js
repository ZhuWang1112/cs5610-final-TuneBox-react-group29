import axios from "axios";

const api = axios.create({
    withCredentials: true,
});

export const searchArtists = async (name) => {
  const response = await api.post(`http://localhost:4000/api/local-artists`, {
    name: name,
  });
  return response.data;
};

export const searchPlaylists = async (name) => {
  const response = await api.post(`http://localhost:4000/api/local-playlists`, {
    name: name,
  });
  return response.data;
};

export const searchSongs = async (name) => {
  const response = await api.post(`http://localhost:4000/api/local-songs`, {
    name: name,
  });
  return response.data;
};

