import React, { useState, useEffect } from "react";
import { getArtists} from "../../../services/rapidAPI-service.js";
import SearchCard from "../SearchCard";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk.js";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {updateSearchResults} from "../../../reducers/search-reducer";
function SearchRemoteArtists() {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {searchContent, searchResults} = useSelector(state => state.search);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
      const fetchdata = async () => {
          const response = await getArtists(searchContent);
          dispatch(updateSearchResults(response));
      }
      fetchdata();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  let num = Math.floor(windowWidth / 250);
  useEffect(() => {
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
  }, []);
  return (

    <div className={`search-artist`}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/*<div className={"text-white"}> artists</div>*/}
        {searchResults &&
            searchResults.map((artist) => (
            <div
                // Please do not add the key, there will be a bug, the reason has not been found yet
              // key={artist.apiArtistId}
              style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
            >
              <SearchCard item={artist} type={"artist"} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchRemoteArtists;
