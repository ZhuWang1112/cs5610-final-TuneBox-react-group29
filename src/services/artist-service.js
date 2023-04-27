import axios from "axios";

const PLAYLIST_API = process.env.REACT_APP_API_BASE + "/api/artist/artistSongs";
const CLOUD_ALBUM_API = process.env.REACT_APP_API_BASE + "/api/remoteApi/albums";
const ARTIST_API = process.env.REACT_APP_API_BASE + "/api/artists";
const API_BASE = process.env.REACT_APP_API_BASE;
axios.defaults.withCredentials = true;

export const findArtistDetails = async (api) => {
  const response = await axios.get(`${PLAYLIST_API}/${api}`);
  return response.data;
};

export const findArtistDetailsOnCloud = async (artistId) => {
    const response = await axios.get(`${CLOUD_ALBUM_API}/${artistId}`);
    return response.data;
};

export const insertArtistIfNotExist = async (artist) => {
  const response = await axios.put(`${ARTIST_API}`, artist);
  return response.data;
};

export const findArtistGeneralInfoById = async (artistId) => {
    const response = await axios.get(`${API_BASE}/api/remoteApi/artistInfo/${artistId}`);
    return response.data;
}
