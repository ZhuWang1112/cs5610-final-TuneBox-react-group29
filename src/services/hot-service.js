import axios from "axios";

export const hotArtists = async () => {
    const response = await axios.get("http://localhost:4000/api/home/topmusic");
    return response.data;
}
export const hotAlbums = async () => {
    const response = await axios.get("http://localhost:4000/api/home/topalbum");
    return response.data;
}
export const hotPlaylists = async () => {
    const uid = JSON.parse(localStorage.getItem("currentUser"))._id;
    const response = await axios.get(`http://localhost:4000/api/home/topplaylists/${uid}`);
    return response.data;
}
export const hotUsers = async () => {
    const uid = JSON.parse(localStorage.getItem("currentUser"))._id;
    const response = await axios.get(`http://localhost:4000/api/home/topusers/${uid}`);
    return response.data;
}
