import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;


export const getTrack = async (track) => {
    const response = await axios.get(`${API_BASE}/api/remoteApi/songs/${track.apiSongId}`);
    return response.data;
}

export const getTracksByAlbumId = async (albumId) => {
  const response = await axios.get(
    `${API_BASE}/api/remoteApi/tracks/${albumId}`
  );
  return response.data;
};

export const getAlbumGeneralInfoByAlbumId = async (albumId) => {
    const response = await axios.get(
        `${API_BASE}/api/remoteApi/albumInfo/${albumId}`
    );
    return response.data;
}