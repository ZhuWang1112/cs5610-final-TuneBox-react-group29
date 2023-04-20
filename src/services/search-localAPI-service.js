import axios from "axios";
// axios.defaults.withCredentials = true;
// const USERS_API_URL = "http://localhost:4000/api/users";

const api = axios.create({
    withCredentials: true,
});

export const searchArtists = (name) => {
    // return axios.get(`http://localhost:4000/api/artists/${name}`)
    const response = api.post(`http://localhost:4000/api/artists`, name);
    console.log("searchLocalArtistsAPI: ", response)
    return response
}

export const searchPlaylists = (name) => {
    // return axios.get(`http://localhost:4000/api/artists/${name}`)
    const response = api.post(`http://localhost:4000/api/playlists`, name);
    console.log("searchLocalPlaylistsAPI: ", response)
    return response
}

// export const hotAlbums = async () => {
//     console.log("hotArtists")
//     const response = await axios.get("http://localhost:4000/api/home/topalbum");
//     console.log("data:!!" + response.data);
//     return response.data;
// }
// export const hotPlaylists = async () => {
//     const response = await axios.get(`http://localhost:4000/api/home/topplaylists`);
//     return response.data;
// }
// export const hotUsers = async () => {
//     const response = await axios.get(`http://localhost:4000/api/home/topusers`);
//     return response.data;
// }