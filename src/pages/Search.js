import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getPlaylists } from "../services/rapidAPI-service.js";

function Search() {
    // let items;
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchTerm);
  const [results, setResults] = useState({});

  const searchPlaylistsRapidAPI = async () => {
    const response = await getPlaylists(search);
    const currentData = JSON.parse(localStorage.getItem("currentPlatlistData"));
    console.log("???", currentData["playlists"]["items"][0]["data"])
      console.log("!!!", currentData["playlists"])
    // console.log("???", currentData["playlists"][1])
    // setResults(response);
    await setResults(currentData["playlists"]);
    // console.log("!!!!!!!", JSON.stringify(response))
    //navigate only used on local search results
    // navigate("/home");
  };

  useEffect(() => {
      if (searchTerm) {
       // searchAllRapidAPI();
          searchPlaylistsRapidAPI();
      }
  }, [searchTerm]);


    return (
      <div>

        <h1>Remote Search Playlists</h1>
        <button onClick={searchPlaylistsRapidAPI} className="float-end btn btn-primary">
          Search
        </button>
        <input
            className="form-control w-75"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <h2>Remote playlists</h2>
        <div >
          <table >
            <tbody>
            <tr>
              {results["items"] &&
                  results["items"].map((playlist) => (
                      <td key={playlist["data"]["uri"]}>
                        <Link to={`https://open.spotify.com/playlist/${playlist["data"]["images"].items[0].sources[0].url.split(":")[2]}`}>
                          <img
                              src={playlist["data"]["images"].items[0].sources[0].url}
                          />
                          <h3>{playlist.data.name}</h3>
                        </Link>
                       {/*<h3>{playlist.data.name}</h3>*/}
                      </td>
                  ))}
            </tr>
            </tbody>
          </table>
        </div>

        {/*<h2>Remote Tracks</h2>*/}
        {/*<div className="table-responsive">*/}
        {/*  <table className="table">*/}
        {/*    <tbody>*/}
        {/*    <tr>*/}
        {/*      {results.tracks &&*/}
        {/*          results.tracks[items].map((track) => (*/}
        {/*              <td>*/}
        {/*                <h3>{track.data.name}</h3>*/}
        {/*                {track.id}*/}
        {/*                <Link to={track.data.uri}>Song's Link</Link>*/}
        {/*              </td>*/}
        {/*          ))}*/}
        {/*    </tr>*/}
        {/*    </tbody>*/}
        {/*  </table>*/}
        {/*</div>*/}


        {/*<div>{results["playlists"]}</div>*/}
      </div>
  );
}

export default Search;