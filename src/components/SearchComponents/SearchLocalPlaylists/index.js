import React, {useState, useEffect} from "react";
import SearchCard from "../SearchCard";
import {useDispatch, useSelector} from "react-redux";
import {searchPlaylistThunk} from "../../../services/thunks/playlist-thunk";
import {findCurrentUserSongsThunk} from "../../../services/thunks/like-thunk";
import {findCurrentUserThunk} from "../../../services/users/users-thunks";
import "./index.css";

import {searchArtistThunk} from "../../../services/thunks/artist-thunk";
import {updateSearchResults} from "../../../reducers/search-reducer";

function SearchLocalPlaylists() {
    const {searchContent, searchResults} = useSelector(state => state.search);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch();

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {

        dispatch(searchPlaylistThunk(searchContent)).then((response) => {
            dispatch(updateSearchResults(response.payload));
        });

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // const searchPlaylistsLocal = async () => {
    //   // console.log("???", currentData["playlists"]["items"][0]["data"])
    //   // localStorage.removeItem('localPlaylists');
    //   dispatch(searchPlaylistThunk(search)).then((response) => {
    //     console.log("response in search", response.payload);
    //     setResults(response.payload);
    //   });
    //   // const localPlaylists = JSON.parse(localStorage.getItem("localPlaylists"));
    //   // await setResults(localPlaylists);
    // };

    let num = Math.floor(windowWidth / 250);

    return (
        <div>

            <div style={{display: "flex", flexWrap: "wrap"}}>
                {searchResults &&
                    searchResults.length > 0 &&
                    searchResults.map((item, id) => (
                        <div
                            // key={item._id}
                            style={{flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%`}}
                        >
                            <SearchCard item={item} type="local-playlist"/>
                        </div>
                    ))}
                {searchResults && searchResults.length === 0 && (
                    <div className={`d-flex justify-content-center w-100`}>
                        <h5 className={`text-muted fw-bold mt-5`}>
                            No Related Playlists Found
                        </h5>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchLocalPlaylists;