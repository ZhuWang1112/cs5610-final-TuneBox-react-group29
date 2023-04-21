import axios from "axios";
import data from "bootstrap/js/src/dom/data";

const key = "a36c07483emsh864414f2c3799b9p1943ffjsn02dd06330afc";
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

export const getAlbums = async (albumName) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
            q: `${albumName}`,
            type: 'albums',
            offset: '0',
            limit: '70',
            numberOfTopResults: '5'
        },
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        let albums = [];
        let n = response.data.albums.totalCount;
        if (n > 70) n = 70;
        for (let i = 0; i < n; i++) {
            albums[i] = {
                apiAlbumId: response.data.albums.items[i].data.uri.split(':')[2],
                title: response.data.albums.items[i].data.name,
                img: response.data.albums.items[i].data.coverArt.sources[0].url,
                date: response.data.albums.items[i].data.date.year,
                artistName: response.data.albums.items[i].data.artists.items[0].profile.name,
                apiArtistId: response.data.albums.items[i].data.artists.items[0].uri.split(':')[2],
            }
        }
        return albums;
    } catch (error) {
        console.error(error);
        return []; // return empty array if error
    }
};



export const getArtists = async (artistsName) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/search/",
    params: {
      q: `${artistsName}`,
      type: "artists",
      offset: "0",
      limit: "70",
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("response in getartist", response.data.artists);
    let n = response.data.artists.totalCount;
    if (n > 70) n = 70;
    const artists = response.data.artists.items.slice(0, n).map((item) => {
      return {
        apiArtistId: item.data.uri.split(":")[2],
        artistName: item.data.profile.name,
        img:
          item.data.visuals &&
          item.data.visuals.avatarImage &&
          item.data.visuals.avatarImage.sources &&
          item.data.visuals.avatarImage.sources.length > 0
            ? item.data.visuals.avatarImage.sources[0].url
            : "",
      };
    });
    return artists;
  } catch (error) {
    console.error(error);
    return []; // return empty array if error
  }
};

export const getTracks = (tracksName) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/search/",
    params: {
      q: `${tracksName}`,
      type: "tracks",
      offset: "0",
      limit: "70",
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

   return axios
    .request(options)
    .then(function (response) {
      console.log(" rapidapi-serivce-tracks: ", response.data);
      // localStorage.clear();
      localStorage.setItem("currentTrackData", JSON.stringify(response.data));
      // console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};