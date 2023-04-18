import axios from "axios";
const PLAYLIST_API = "http://localhost:4000/api/artist/detailsPlayList";
//const PLAYLIST_API = "http://localhost:4000/api/playlists/details/artistplaylist";

// api/artists/details/:name
export const findArtistDetails = async (name) => {
  const response = await axios.get(`${PLAYLIST_API}/${name}`);
  return response.data;
};
