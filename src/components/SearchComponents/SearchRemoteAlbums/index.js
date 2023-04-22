import React, { useState, useEffect } from "react";
import { getAlbums } from "../../../services/rapidAPI-service.js";
import SearchCard from "../SearchCard";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk.js";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import "./index.css";
=======
import {useDispatch, useSelector} from "react-redux";
import "./index.css"
import {updateSearchResults} from "../../../reducers/search-reducer";
>>>>>>> 3b3dbfd (change ui on search and finish the cloud part)
function SearchRemoteAlbums() {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {searchContent, searchResults} = useSelector(state => state.search);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const fetchdata = async () => {
        const response = await getAlbums(searchContent);
        dispatch(updateSearchResults(response));
    }
    fetchdata();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);


  let num = Math.floor(windowWidth / 250);
  useEffect(() => {
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
  }, []);

  return (
<<<<<<< HEAD
    <div className={`search-album`}>
      <button
        onClick={searchAlbumsRapidAPI}
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

=======
    <div>
>>>>>>> 3b3dbfd (change ui on search and finish the cloud part)
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {searchResults &&
            searchResults.map((album) => (
            <div
                // Please do not add the key, there will be a bug, the reason has not been found yet
              // key={album.apiAlbumId}
              style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
            >
              <SearchCard item={album} type={"album"} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchRemoteAlbums;