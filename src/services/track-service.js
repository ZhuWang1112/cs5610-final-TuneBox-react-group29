import axios from "axios";


export const getTrack = async (track) => {
    const response = await axios.get(`http://localhost:4000/api/remoteApi/songs/${track.apiSongId}`);
    return response.data;
}

export const getTracksByAlbumId = async (albumId) => {
  const response = await axios.get(
    `http://localhost:4000/api/remoteApi/tracks/${albumId}`
  );
  return response.data;
};

export const getAlbumGeneralInfoByAlbumId = async (albumId) => {
    const response = await axios.get(
        `http://localhost:4000/api/remoteApi/albumInfo/${albumId}`
    );
    return response.data;
}