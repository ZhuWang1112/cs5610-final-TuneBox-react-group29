import axios from "axios";

//const PLAYLIST_API = "http://localhost:4000/api/artist/detailsPlayList";
const PLAYLIST_API = "http://localhost:4000/api/artist/artistSongs";
const CLOUD_ALBUM_API = "http://localhost:4000/api/remoteApi/albums"

// http://localhost:4000/api/artist/detailsPlayList/Taylor Swift
export const findArtistDetails = async (api) => {
  //console.log("**************************************");
  //console.log(api);
  const response = await axios.get(`${PLAYLIST_API}/${api}`);
  //const response = await axios.get("http://localhost:4000/api/artist/artistSongs/06HL4z0CvFAxyc27GXpf02");
  return response.data;
};

// http://localhost:4000/api/remoteApi/albums/06HL4z0CvFAxyc27GXpf02
export const findArtistDetailsOnCloud = async (artistId) => {
    const response = await axios.get(`${CLOUD_ALBUM_API}/${artistId}`);
    return response.data;
};