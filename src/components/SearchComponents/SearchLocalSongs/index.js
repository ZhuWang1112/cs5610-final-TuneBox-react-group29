import React, { useState, useEffect } from "react";
import SearchCard from "../SearchCard";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router";
import { searchSongThunk } from "../../../services/thunks/song-thunk";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk";
import "./index.css";
import {updateSearchResults} from "../../../reducers/search-reducer";
import Pagination from "../../AdminComponents/Pagination/Pagination";
import * as searchLocalService from "../../../services/search-localAPI-service";


function SearchLocalSongs() {
  const [currentPage, setCurrentPage] = useState(1); // current page
  const [resultsPerPage, setResultsPerPage] = useState(10); // ech page show 10 results
  const {searchContent, searchResults} = useSelector(state => state.search);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocalSongs = async () => {
      const response = await searchLocalService.searchSongs(searchContent);
      dispatch(updateSearchResults(response));
    }
    fetchLocalSongs();

    // dispatch(searchSongThunk(searchContent)).then((response) => {
    //   dispatch(updateSearchResults(response.payload));
    // });

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

    <div className={`position-relative search-track-local`}>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {currentResults.length > 0 &&
            currentResults.map((item, idx) => (
            <div
              // key={item._id}
              style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
            >
              <SearchCard
                item={item}
                type="local-song"
                setShowUpgrade={setShowUpgrade}
              />
            </div>
          ))}

        {searchResults && searchResults.length === 0 && (
          <div className={`d-flex justify-content-center w-100`}>
            <h5 className={`text-muted fw-bold mt-5`}>
              No Related Songs Found
            </h5>
          </div>
        )}
      </div>
      {showUpgrade && (
        <>
          <div
            className={`col text-white position-absolute upgrade-in-local-song-div p-3 rounded-3 bg-primary fw-bold`}
          >
            Enjoy your Premium Journey!
            <div className={`text-white upgrade-text`}>
              Upgrade your account to add more songs.
            </div>
            <div
              className={`mt-2 d-flex align-items-center justify-content-end`}
            >
              <button
                className={`btn not-now-btn`}
                onClick={() => setShowUpgrade(false)}
              >
                Not now
              </button>
              <button
                className={` login-btn rounded-pill`}
                onClick={() => {
                  setShowUpgrade(false);
                  navigate("/premium");
                }}
              >
                Upgrade
              </button>
            </div>
          </div>
        </>
      )}
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

export default SearchLocalSongs;