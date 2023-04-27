import axios from "axios";
axios.defaults.withCredentials = true;
const API_BASE = process.env.REACT_APP_API_BASE;
export const hotArtists = async () => {
    console.log("hotArtists")
    const response = await axios.get(`${API_BASE}/api/home/topmusic`);
    console.log("data:!!" + response.data);
    return response.data;
}
export const hotAlbums = async () => {
    console.log("hotArtists")
    const response = await axios.get(`${API_BASE}/api/home/topalbum`);
    console.log("data:!!" + response.data);
    return response.data;
}
export const hotPlaylists = async () => {
    const response = await axios.get(`${API_BASE}/api/home/topplaylists`);
    return response.data;
}
export const hotUsers = async () => {
    const response = await axios.get(`${API_BASE}/api/home/topusers`);
    return response.data;
}
