import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getArtists } from "../../../services/rapidAPI-service.js";
// import HomeCard from "../../HomeCard";
import SearchCard from "../SearchCard";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { useDispatch } from "react-redux";

function SearchRemoteArtists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const searchArtistsRapidAPI = async () => {
    const response = await getArtists(search);
    setResults(response);
  };

  let num = Math.floor(windowWidth / 250);
  useEffect(() => {
    dispatch(findCurrentUserThunk());
  }, []);
  return (
    <div>
      <button
        onClick={searchArtistsRapidAPI}
        className="float-end btn btn-primary"
      >
        Search
      </button>
      <input
        className="form-control w-75"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/*{results["items"] &&*/}
        {/*    results["items"].map((playlist) => (*/}
        {/*        <td key={playlist["data"]["uri"]}>*/}
        {/*            <Link to={`https://open.spotify.com/playlist/${playlist["data"]["images"].items[0].sources[0].url.split(":")[2]}`}>*/}
        {/*                <img*/}
        {/*                    src={playlist["data"]["images"].items[0].sources[0].url}*/}
        {/*                />*/}
        {/*                <h3>{playlist.data.name}</h3>*/}
        {/*            </Link>*/}
        {/*            /!*<h3>{playlist.data.name}</h3>*!/*/}
        {/*        </td>*/}
        {/*))}*/}

        {results &&
          results.map((artist) => (
            <div
              key={artist.apiArtistId}
              style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
            >
              <SearchCard item={artist} type={"artist"} />
            </div>
          ))}
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

export default SearchRemoteArtists;