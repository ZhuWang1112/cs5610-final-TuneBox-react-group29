import React, { useState, useEffect } from "react";
import {getArtists, getTracks} from "../../../services/rapidAPI-service.js";
import SearchCard from "../SearchCard";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk.js";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {updateSearchResults} from "../../../reducers/search-reducer";
function SearchRemoteTracks() {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const {searchContent, searchResults} = useSelector(state => state.search);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
      const fetchdata = async () => {
          const response = await getTracks(searchContent);
          dispatch(updateSearchResults(response));
      }
      fetchdata();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
  }, []);


  let num = Math.floor(windowWidth / 250);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {searchResults &&
            searchResults.map((track) => (
            <div
// Please do not add the key, there will be a bug, the reason has not been found yet
              // key={track.apiSongId}
              style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
            >
              <SearchCard item={track} type={"track"} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchRemoteTracks;