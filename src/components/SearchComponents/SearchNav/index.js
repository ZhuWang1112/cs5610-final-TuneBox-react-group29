import "./index.css";
import {useLocation, useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {BiSearch} from "react-icons/bi";
import React, {useEffect, useState} from "react";
import {getAlbums, getArtists, getTracks} from "../../../services/rapidAPI-service";
import {useDispatch, useSelector} from "react-redux";
import {
    updateSearchContent,
    updateSearchResults, updateSearchType,
} from "../../../reducers/search-reducer";
import * as searchLocalService from "../../../services/search-localAPI-service";
const SearchNav = () => {
    const { pathname } = useLocation();
    const paths = pathname.split("/");
    const active = paths[2];
    const {searchContent} = useSelector(state => state.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(updateSearchType(active));
    }, [pathname]);

    const searchRapidAPI = async (e) => {
        if (e.key !== "Enter" && (active === "search-remote-albums" || active === "search-remote-artists" || active === "search-remote-tracks")) {
            return;
        }
        let response = [];

        if (active === "search-remote-albums") {
            navigate(`/search/search-remote-albums/${searchContent}`);
            response = await getAlbums(searchContent);
            dispatch(updateSearchResults(response));
        } else if (active === "search-remote-artists") {
            navigate(`/search/search-remote-artists/${searchContent}`);
            response = await getArtists(searchContent);
            dispatch(updateSearchResults(response));
        } else if (active === "search-remote-tracks") {
            navigate(`/search/search-remote-tracks/${searchContent}`);
            response = await getTracks(searchContent);
            dispatch(updateSearchResults(response));
        } else if (active === "search-local-playlists") {
            navigate(`/search/search-local-playlists/${searchContent}`);
            response = await searchLocalService.searchPlaylists(searchContent);
            dispatch(updateSearchResults(response));
            // dispatch(searchPlaylistThunk(searchContent)).then((response) => {
            //     dispatch(updateSearchResults(response.payload));
            // });
        } else if (active === "search-local-artists") {
            navigate(`/search/search-local-artists/${searchContent}`);
            response =  await searchLocalService.searchArtists(searchContent);
            dispatch(updateSearchResults(response));
            // dispatch(searchArtistThunk(searchContent)).then((response) => {
            //     dispatch(updateSearchResults(response.payload));
            // });
        } else if (active === "search-local-songs") {
            navigate(`/search/search-local-songs/${searchContent}`);
            response = await searchLocalService.searchSongs(searchContent);
            dispatch(updateSearchResults(response));
            // dispatch(searchSongThunk(searchContent)).then((response) => {
            //     dispatch(updateSearchResults(response.payload));
            // });
        }
    };

    return (
        <>
            <div className="col-8 position-relative">
                <input placeholder="What do you want to listen to?"
                       className="form-control rounded-pill ps-5"
                       style={{ color: "white" }}
                       value={searchContent}
                       onChange={(e) => dispatch(updateSearchContent(e.target.value))}
                       // note: not onKeyDown
                       onKeyUp={searchRapidAPI}
                />
                <BiSearch className="bi bi-search position-absolute
                       wd-nudge-up" size={24}></BiSearch>
            </div>
            <ul className="nav nav-pills pb-1">
                <li className="nav-item">
                    <Link className="nav-link wd-nav" to="/search/search-remote-albums"><span className={`${active === 'search-remote-albums' ? 'wd-active' : ''}`}>Cloud Albums</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link wd-nav" to="/search/search-remote-artists"><span className={`${active === 'search-remote-artists' ? 'wd-active' : ''}`}>Cloud Artists</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link wd-nav" to="/search/search-remote-tracks"><span className={`${active === 'search-remote-tracks' ? 'wd-active' : ''}`}>Cloud Tracks</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link wd-nav" to="/search/search-local-playlists"><span className={`${active === 'search-local-playlists' ? 'wd-active' : ''}`}>Local Playlists</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link wd-nav" to="/search/search-local-artists"><span className={`${active === 'search-local-artists' ? 'wd-active' : ''}`}>Local Artists</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link wd-nav" to="/search/search-local-songs"><span className={`${active === 'search-local-songs' ? 'wd-active' : ''}`}>Local Songs</span></Link>
                </li>
            </ul>
        </>
    );
}
export default SearchNav;