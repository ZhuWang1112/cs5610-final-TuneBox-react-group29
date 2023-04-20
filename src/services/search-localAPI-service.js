import axios from "axios";

const api = axios.create({
    withCredentials: true,
});

export const searchArtists = (name) => {
    const response = api.post(`http://localhost:4000/api/local-artists`, {name:name});
    console.log("searchLocalArtistsAPI: ", response)
    return response
}

export const searchPlaylists = (name) => {
    const response = api.post(`http://localhost:4000/api/local-playlists`, {name:name});
    console.log("searchLocalPlaylistsAPI: ", response)
    return response
}

export const searchSongs = (name) => {
    const response = api.post(`http://localhost:4000/api/local-songs`, {name:name});
    console.log("searchLocalSongsAPI: ", response)
    return response
}

