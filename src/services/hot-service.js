import axios from "axios";
axios.defaults.withCredentials = true;
export const hotArtists = async () => {
    console.log("hotArtists")
    const response = await axios.get("http://localhost:4000/api/home/topmusic");
    console.log("data:!!" + response.data);
    return response.data;
}
export const hotAlbums = async () => {
    console.log("hotArtists")
    const response = await axios.get("http://localhost:4000/api/home/topalbum");
    console.log("data:!!" + response.data);
    return response.data;
}
export const hotPlaylists = async () => {
    const response = await axios.get(`http://localhost:4000/api/home/topplaylists`);
    return response.data;
}
export const hotUsers = async () => {
    const response = await axios.get(`http://localhost:4000/api/home/topusers`);
    return response.data;
}
