import axios from "axios";
import data from "bootstrap/js/src/dom/data";
const API_BASE = process.env.REACT_APP_API_BASE;
const key = "dc311bd25dmshc09f7a2a7c55b75p166c09jsnaf5f5287a4e0";
axios.defaults.withCredentials = true;
export const getAlbums = async (albumName) => {
    const param = albumName || 'a';
    const response = await axios.get(`${API_BASE}/api/remoteApi/searchAlbums/${param}`);
    return response.data;
};


export const getArtists = async (artistsName) => {
    const param = artistsName || 'a';
    const response = await axios.get(`${API_BASE}/api/remoteApi/searchArtists/${param}`);
    return response.data;
};

export const getTracks = async (tracksName) => {
    const param = tracksName || 'a';
    const response = await axios.get(`${API_BASE}/api/remoteApi/searchTracks/${param}`);
    return response.data;
};