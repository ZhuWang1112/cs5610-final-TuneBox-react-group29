import React, { useState, useEffect } from "react";
import SearchCard from "../SearchCard";
import {useDispatch, useSelector} from "react-redux";
import {searchPlaylistThunk} from "../../../services/thunks/playlist-thunk";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import "./index.css";

function SearchLocalPlaylists() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
  }, []);

  const searchPlaylistsLocal = async () => {
    // localStorage.removeItem('localPlaylists');
    dispatch(searchPlaylistThunk(search)).then((response) => {
      setResults(response.payload);
    });
    // const localPlaylists = JSON.parse(localStorage.getItem("localPlaylists"));
    // await setResults(localPlaylists);
  };

  let num = Math.floor(windowWidth / 250);

  return (
    <div className={`search-playlist-local`}>
      <button
        onClick={searchPlaylistsLocal}
        className="float-end btn btn-primary"
      >
        Search
      </button>
      <input
        className="form-control w-75"
        style={{ color: "white" }}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {results &&
          results.length > 0 &&
          results.map((item, id) => (
            <div
              key={item._id}
              style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
            >
              <SearchCard item={item} type="local-playlist" />
            </div>
          ))}
        {results && results.length === 0 && (
          <div className={`d-flex justify-content-center w-100`}>
            <h5 className={`text-muted fw-bold mt-5`}>
              No Related Playlists Found
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchLocalPlaylists;