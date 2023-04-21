import React, { useState, useEffect } from "react";
import SearchCard from "../SearchCard";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router";
import { searchSongThunk } from "../../../services/thunks/song-thunk";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk";

function SearchLocalSongs() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  const navigate = useNavigate();

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

  const searchSongsLocal = async () => {
    // console.log("???", currentData["playlists"]["items"][0]["data"])
    localStorage.removeItem("localSongs");
    await dispatch(searchSongThunk(search));
    const localSongs = JSON.parse(localStorage.getItem("localSongs"));
    await setResults(localSongs);
  };

  let num = Math.floor(windowWidth / 250);

  return (
    <div className={`position-relative`}>
      <button onClick={searchSongsLocal} className="float-end btn btn-primary">
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
        {results && results._id && (
          <div
            key={results._id}
            style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
          >
            <SearchCard
              item={results}
              type="local-song"
              setShowUpgrade={setShowUpgrade}
            />
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
    </div>
  );
}

export default SearchLocalSongs;