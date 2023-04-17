import axios from "axios";


export const getTrack = async (track) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/tracks/',
        params: {ids: track.apiSongId},
        headers: {
            'X-RapidAPI-Key': '230ac653ebmsh094464f7969dbdbp1121a1jsnc05a7bf66309',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    const response = await axios.request(options);
    return response.data;
}