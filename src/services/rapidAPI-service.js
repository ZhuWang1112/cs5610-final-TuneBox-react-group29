import axios from "axios";
// const NAPSTER_API = "https://api.napster.com/v2.2";
// const NAPSTER_KEY = process.env.REACT_APP_NAPSTER_KEY;

// export const fullTextSearch = async (query) => {
//     const options = {
//         method: 'GET',
//         url: 'https://spotify23.p.rapidapi.com/search/',
//         params: {
//             q: 'query',
//             type: 'multi',
//             offset: '0',
//             limit: '10',
//             numberOfTopResults: '5'
//         },
//         headers: {
//             'X-RapidAPI-Key': '72347ff321msh369939397882912p1fdb14jsn7f3b5a9e92f1',
//             'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
//         }
//     };
//
//     await axios.request(options).then(function (response) {
//         console.log(" rapidapi-serivce: ",response.data);
//         localStorage.setItem("currentData", JSON.stringify(response.data))
//         return response.data
//     }).catch(function (error) {
//         console.error(error);
//         return
//     });
//
//     // const response = await axios.get(
//     //     `${NAPSTER_API}/search/verbose?query=${query}&apikey=${NAPSTER_KEY}`
//     // );
//     // return response.data.search.data;
// };

export const getPlaylists = async (playlistsName) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
            q: `${playlistsName}`,
            type: 'playlists',
            offset: '0',
            limit: '70',
            numberOfTopResults: '5'
        },
        headers: {
            'X-RapidAPI-Key': '72347ff321msh369939397882912p1fdb14jsn7f3b5a9e92f1',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(" rapidapi-serivce: ",response.data);
        // localStorage.clear();
        localStorage.setItem("currentPlatlistData", JSON.stringify(response.data))
        // console.log(response.data);
        return response.data
    }).catch(function (error) {
        console.error(error);
        return
    });
};


export const getArtists = async (artistsName) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {q: `${artistsName}`, type: 'artists', offset: '0', limit: '70', numberOfTopResults: '5'},
        headers: {
            'X-RapidAPI-Key': '72347ff321msh369939397882912p1fdb14jsn7f3b5a9e92f1',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    await axios.request(options).then(function (response) {
        console.log(" rapidapi-serivce-artists: ",response.data);
        // localStorage.clear();
        localStorage.setItem("currentArtistData", JSON.stringify(response.data))
        // console.log(response.data);
        return response.data
    }).catch(function (error) {
        console.error(error);
        return
    });
};


export const getTracks = async (tracksName) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {q: `${tracksName}`, type: 'tracks', offset: '0', limit: '70', numberOfTopResults: '5'},
        headers: {
            'X-RapidAPI-Key': '72347ff321msh369939397882912p1fdb14jsn7f3b5a9e92f1',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(" rapidapi-serivce-tracks: ",response.data);
        // localStorage.clear();
        localStorage.setItem("currentTrackData", JSON.stringify(response.data))
        // console.log(response.data);
        return response.data
    }).catch(function (error) {
        console.error(error);
    });
};