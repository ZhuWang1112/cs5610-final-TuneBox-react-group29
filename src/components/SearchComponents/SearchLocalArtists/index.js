import React, { useState, useEffect } from "react";
import SearchCard from "../SearchCard";
import {useDispatch, useSelector} from "react-redux";
import {searchArtistThunk} from "../../../services/thunks/artist-thunk";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";

import "./index.css";
import {getTracks} from "../../../services/rapidAPI-service";
import {updateSearchResults} from "../../../reducers/search-reducer";
import Pagination from "../../AdminComponents/Pagination/Pagination";


function SearchLocalArtists() {
    const [currentPage, setCurrentPage] = useState(1); // current page
    const [resultsPerPage, setResultsPerPage] = useState(10); // ech page show 10 results
    const {searchContent, searchResults} = useSelector(state => state.search);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {

          dispatch(searchArtistThunk(searchContent)).then((response) => {
              dispatch(updateSearchResults(response.payload));
          });


    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
  }, []);

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  let num = Math.floor(windowWidth / 250);

  return (

    <div className={`search-artist-local`}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {currentResults.length > 0 &&
            currentResults.map((item, id) => (
            <div
              // key={item._id}
              style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
            >
              <SearchCard item={item} type="local-artist" />
            </div>
          ))}
        {searchResults && searchResults.length === 0 && (
          <div className={`d-flex justify-content-center w-100`}>
            <h5 className={`text-muted fw-bold mt-5`}>
              No Related Artists Found
            </h5>
          </div>
        )}
      </div>
        <div className="d-flex justify-content-center mt-3">
            {/*Just simple frontend pagination, do not need to modify the backend*/}
            {currentResults.length > 0 && <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                usersPerPage={resultsPerPage}
                totalCount={searchResults.length}/>}
        </div>
    </div>
  );
}

export default SearchLocalArtists;