import React, {useEffect} from 'react'
import {Route, Routes} from "react-router";
import SearchRemoteAlbums from "../components/SearchComponents/SearchRemoteAlbums/index.js"
import SearchRemoteArtists from "../components/SearchComponents/SearchRemoteArtists/index.js";
import SearchRemoteTracks from "../components/SearchComponents/SearchRemoteTracks/index.js";
import SearchLocalArtists from "../components/SearchComponents/SearchLocalArtists/index.js";
import SearchLocalPlaylists from "../components/SearchComponents/SearchLocalPlaylists/index.js";
import SearchLocalSongs from "../components/SearchComponents/SearchLocalSongs/index.js";
import SearchNav from "../components/SearchComponents/SearchNav/index.js";
import {useDispatch} from "react-redux";
import {findCurrentUserThunk} from "../services/users/users-thunks";
import {findCurrentUserSongsThunk} from "../services/thunks/like-thunk";

const Search = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findCurrentUserThunk());
        dispatch(findCurrentUserSongsThunk());
    }, []);
    return (
        <div>
            <SearchNav/>
            <Routes>
                <Route path="/search-remote-albums/*" element={<SearchRemoteAlbums />} />
                <Route path="/search-remote-artists/*" element={<SearchRemoteArtists />} />
                <Route path="/search-remote-tracks/*" element={<SearchRemoteTracks />} />
                <Route path="/search-local-artists/*" element={<SearchLocalArtists />} />
                <Route path="/search-local-playlists/*" element={<SearchLocalPlaylists />} />
                <Route path="/search-local-songs/*" element={<SearchLocalSongs />} />
            </Routes>
        </div>
    );
}


export default Search