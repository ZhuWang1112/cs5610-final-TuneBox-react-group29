import React, { useState, useEffect } from "react";
import {getArtists, getTracks} from "../../../services/rapidAPI-service.js";
import SearchCard from "../SearchCard";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk.js";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {updateSearchResults} from "../../../reducers/search-reducer";
import Pagination from "../../AdminComponents/Pagination/Pagination";
function SearchRemoteTracks() {
  const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1); // current page
    const [resultsPerPage, setResultsPerPage] = useState(10); // ech page show 10 results
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

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);


    let num = Math.floor(windowWidth / 250);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {currentResults.map((track) => (
            <div
// Please do not add the key, there will be a bug, the reason has not been found yet
              // key={track.apiSongId}
              style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
            >
              <SearchCard item={track} type={"track"} />
            </div>
          ))}
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

export default SearchRemoteTracks;