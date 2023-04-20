import React, { useState, useEffect } from "react";
import SearchCard from "../SearchCard";
import {useDispatch, useSelector} from "react-redux";
import {searchArtistThunk} from "../../../services/thunks/artist-thunk";

function SearchLocalArtists() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const searchArtistsLocal = async () => {
        // console.log("???", currentData["playlists"]["items"][0]["data"])
        localStorage.removeItem('localArtists');
        await dispatch(searchArtistThunk( search ));
        const localArtists = JSON.parse(localStorage.getItem("localArtists"));
        await setResults(localArtists);
    };

    let num = Math.floor(windowWidth / 250);

    return (
        <div>
            <button onClick={searchArtistsLocal} className="float-end btn btn-primary">
                Search
            </button>
            <input
                className="form-control w-75"
                style={{ color: 'white' }}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {results && results._id  &&
                        (<div key={results._id} style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}>
                            <SearchCard item={results} type="local-artist"/>
                        </div>)
                    }
            </div>
        </div>
    );
}

export default SearchLocalArtists;