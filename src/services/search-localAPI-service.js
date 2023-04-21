import axios from "axios";

const api = axios.create({
    withCredentials: true,
});

export const searchArtists = async (name) => {
  const response = await api.post(`http://localhost:4000/api/local-artists`, {
    name: name,
  });
  console.log("searchLocalArtistsAPI: ", response.data);
  return response.data;
};

export const searchPlaylists = async (name) => {
  const response = await api.post(`http://localhost:4000/api/local-playlists`, {
    name: name,
  });
  console.log("searchLocalPlaylistsAPI: ", response.data);
  return response.data;
};

export const searchSongs = async (name) => {
  const response = await api.post(`http://localhost:4000/api/local-songs`, {
    name: name,
  });
  console.log("searchLocalSongsAPI: ", response.data);
  return response.data;
};

