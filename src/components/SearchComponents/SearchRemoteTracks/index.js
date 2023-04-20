import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTracks } from "../../../services/rapidAPI-service.js";
// import HomeCard from "../../HomeCard";
import SearchCard from "../SearchCard";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { useDispatch } from "react-redux";

function SearchRemoteTracks() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [search, setSearch] = useState(null);
    const [results, setResults] = useState({});
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

    useEffect(() => {
        dispatch(findCurrentUserThunk());
    }, []);

    const searchTracksRapidAPI = async () => {
        localStorage.removeItem('currentTrackData');
        const response = await getTracks(search);
        const currentData = JSON.parse(localStorage.getItem("currentTrackData"));
        // console.log("???", currentData["tracks"]);
        await setResults(currentData["tracks"]);
    };

    let num = Math.floor(windowWidth / 250);

    return (
        <div>
            <button
                onClick={searchTracksRapidAPI}
                className="float-end btn btn-primary"
            >
                Search
            </button>
            <input
                className="form-control w-75"
                style={{ color: 'white' }}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div style={{ display: "flex", flexWrap: "wrap" }}>

                {results["items"] &&
                    results["items"].map((track) => (
                        <div
                            key={track["data"]["uri"]}
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