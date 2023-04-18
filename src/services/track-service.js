import axios from "axios";


export const getTrack = async (track) => {
    const response = await axios.get(`http://localhost:4000/api/remoteApi/songs/${track.apiSongId}`);
    return response.data;
}