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
                style={{ color: 'white' }}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div style={{ display: "flex", flexWrap: "wrap" }}>


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


        </div>
    );
}

export default SearchRemoteArtists;
