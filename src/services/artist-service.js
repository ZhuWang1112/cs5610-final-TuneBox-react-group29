import axios from "axios";

const PLAYLIST_API = "http://localhost:4000/api/artist/artistSongs";
const CLOUD_ALBUM_API = "http://localhost:4000/api/remoteApi/albums";
const ARTIST_API = "http://localhost:4000/api/artists";

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
    const response = await axios.get(`http://localhost:4000/api/remoteApi/artistInfo/${artistId}`);
    return response.data;
}
