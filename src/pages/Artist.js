import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { findArtistDetails  } from "../services/artist-service";
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
    const { name } = useParams();
    const dispatch = useDispatch();
    const [playlist, setPlaylist] = useState(null);
    const [artist, setArtist] = useState({});
    const loginUser = JSON.parse(localStorage.getItem("currentUser"));
    const { currentUser } = useSelector((state) => state.user);

    const getArtistDetails = async (name) => {
        const res = await findArtistDetails(name);
        setArtist(res.artist);
      };

    const getPlaylistDetails = async (name) => {
        const res = await findArtistDetails(name);
        setPlaylist(res.playlist);
    };

   useEffect(() => {
        getArtistDetails(name);
        getPlaylistDetails(name);
        dispatch(findCurrentUserThunk());
        dispatch(findCurrentUserSongsThunk());
   }, [name]);

   return (
       <div>
           <div className={`wd-image-container`}>
                <img src={`/images/playlist-banner.jpeg`} height="400px" width="100%" />
                <div className={`inner-img`}>
                        <img className={`rounded-icon`} src={ artist.img }/>
                </div>
                <div class={`wd-text-container`}>
                    <FontAwesomeIcon className={`wd-check-circle`} icon={faCheckCircle} />
                    <sp/> Verified Artist
                    <div className={`row ps-3 wd-name`}>
                        { artist.name }
                    </div>

                </div>
           </div>


            <div className={`row pt-5`}>
                <div className={`col-4`}>
                    <h5 className={`fw-fold wd-gray-text`}># TITLE</h5>
                </div>
                <div className={`col-2 text-muted ps-0`}>
                    <BsFillPersonLinesFill size={30} />
                </div>
                <div className={`col-2 text-muted ps-0`}>
                    <AiOutlineFieldTime size={30} />
                </div>
                <div className={`col-2`}></div>
                <div className={`col`}></div>
            </div>

           <div>
                <ArtistPlayListDetail playlist={playlist} setPlaylist={setPlaylist} />
           </div>


       </div>
     );
};
export default Artist;