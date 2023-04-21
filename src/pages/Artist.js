import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { findArtistDetails, findArtistDetailsOnCloud } from "../services/artist-service";
import ArtistPlayListDetail from "../components/ArtistPlayListDetail";
import "./artist_styles.css";

import { faCheckCircle } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";

import {
  findUserByIdThunk,
  findCurrentUserThunk,
} from "../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../services/thunks/like-thunk";

const Artist = () => {
    const { api } = useParams();
    console.log("api in artist page", api);
    const dispatch = useDispatch();
    const [playlist, setPlaylist] = useState(null);
    const [artist, setArtist] = useState(null);
    const [songs, setSongs] = useState([]);
    const [artistAlbum, setArtistAlbum] = useState({});
    const { likedSongs } = useSelector((state) => state.likedSong);

    const getArtistDetails = async (api) => {
      const res = await findArtistDetails(api);
      // console.log("songs in artist", res.artist);
      setArtist(res.artist);
      setSongs(res.songs);
    };

    useEffect(() => {
      getArtistDetails(api);
      // getPlaylistDetails(api);
      // getArtistAlbums(api);
      dispatch(findCurrentUserThunk());
      dispatch(findCurrentUserSongsThunk());
    }, [api]);

    return (
      <div>
        <div className={`wd-image-container`}>
          <img
            src={`/images/playlist-banner.jpeg`}
            height="400px"
            width="100%"
          />
          <div className={`inner-img`}>
            <img
              className={`rounded-icon`}
              src={artist ? artist.img : "/images/playlist-cover.jpeg"}
            />
          </div>
          <div class={`wd-text-container`}>
            <FontAwesomeIcon
              className={`wd-check-circle`}
              icon={faCheckCircle}
            />
            <sp /> Verified Artist
            <div className={`row ps-3 wd-name`}>
              {artist ? artist.name : "Unknown"}
            </div>
          </div>
        </div>

        <div className={`row pt-5`}>
          <div className={`col-4`}>
            <h5 className={`fw-fold wd-gray-text`}># TITLE</h5>
          </div>
          <div className={`col text-muted ps-0`}>
            <BsFillPersonLinesFill size={30} />
          </div>
          <div className={`col-2 text-muted ps-0 d-none d-xl-flex`}>
            <AiOutlineFieldTime size={30} />
          </div>
          <div className={`col-2`}></div>
          <div className={`col-1`}></div>
        </div>

        <div>{songs.length > 0 && <ArtistPlayListDetail songs={songs} />}</div>
      </div>
    );
};
export default Artist;