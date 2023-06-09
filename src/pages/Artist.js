import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { findArtistDetails } from "../services/artist-service";
import ArtistPlayListDetail from "../components/ArtistPlayListDetail";
import "./artist_styles.css";

import { useNavigate } from "react-router";
import { faCheckCircle } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BsFillPersonLinesFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";

import { findCurrentUserThunk } from "../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../services/thunks/like-thunk";

const Artist = () => {
  const { api } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);

  const getArtistDetails = async (api) => {
    if (api === "null") {
      setSongs([]);
      return;
    }
    const res = await findArtistDetails(api);
    setArtist(res.artist);
    setSongs(res.songs);
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate back on arrow click
  };

  useEffect(() => {
    getArtistDetails(api);
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
  }, [api]);

  return (
    <div className={`position-relative`}>
      <BsFillArrowLeftCircleFill
        onClick={handleBackClick}
        size={30}
        className={`position-absolute text-warning artist-arrow-back-icon`}
      />
      <div className={`wd-image-container`}>
        <img src={`/images/playlist-banner.jpeg`} height="400px" width="100%" />
        <div className={`inner-img`}>
          <img
            className={`rounded-icon`}
            src={artist ? artist.img : "/images/playlist-cover.jpeg"}
          />
        </div>
        <div className={`wd-text-container`}>
          <FontAwesomeIcon className={`wd-check-circle`} icon={faCheckCircle} />
          <span className={`mb-0 d-inline ms-2`}>Verified Artist </span>
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
      <div>
        {songs.length === 0 && (
          <div className={`d-flex justify-content-center mt-5`}>
            <h5 className={`text-muted fw-bold`}>Can't Find Songs</h5>
          </div>
        )}
      </div>
    </div>
  );
};
export default Artist;