import axios from "axios";
// const NAPSTER_API = "https://api.napster.com/v2.2";
// const NAPSTER_KEY = process.env.REACT_APP_NAPSTER_KEY;

export const fullTextSearch = async (query) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
            q: 'query',
            type: 'multi',
            offset: '0',
            limit: '10',
            numberOfTopResults: '5'
        },
        headers: {
            'X-RapidAPI-Key': '72347ff321msh369939397882912p1fdb14jsn7f3b5a9e92f1',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(" rapidapi-serivce: ",response.data);
        localStorage.setItem("currentData", JSON.stringify(response.data))
        return response.data
    }).catch(function (error) {
        console.error(error);
        return
    });

    // const response = await axios.get(
    //     `${NAPSTER_API}/search/verbose?query=${query}&apikey=${NAPSTER_KEY}`
    // );
    // return response.data.search.data;
};

export const getPlaylists = async (playlistsName) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
            q: `${playlistsName}`,
            type: 'playlists',
            offset: '0',
            limit: '10',
            numberOfTopResults: '5'
        },
        headers: {
            'X-RapidAPI-Key': '72347ff321msh369939397882912p1fdb14jsn7f3b5a9e92f1',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(" rapidapi-serivce: ",response.data);
        localStorage.clear();
        localStorage.setItem("currentData", JSON.stringify(response.data))
        // console.log(response.data);
        return response.data
    }).catch(function (error) {
        console.error(error);
        return
    });
    // const response = await axios.get(
    //     `${NAPSTER_API}/albums/${albumId}?apikey=${NAPSTER_KEY}`
    // );
    // return response.data.albums[0];
};

// export const getTrack = async (trackId) => {
//     const response = await axios.get(
//         `${NAPSTER_API}/tracks/${trackId}?apikey=${NAPSTER_KEY}`
//     );
//     return response.data.tracks[0];
// };
//
// export const getAlbumTracks = async (albumId) => {
//     const response = await axios.get(
//         `${NAPSTER_API}/albums/${albumId}/tracks?apikey=${NAPSTER_KEY}`
//     );
//     return response.data.tracks;
// };