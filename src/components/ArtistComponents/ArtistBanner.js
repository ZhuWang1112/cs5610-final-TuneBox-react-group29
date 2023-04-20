import React, { useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaylist } from "../../reducers/playlist-reducer.js";
import { updatePlaylist as updatePlaylistService } from "../../services/playlist-service.js";
import { MdAddAPhoto } from "react-icons/md";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router";

const defaultFile = "/images/playlist-cover.jpeg";

const ArtistBanner = ({ artistName, img, albumNumber }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back on arrow click
  };
  return (
    <div className={`position-relative`}>
      <BsFillArrowLeftCircleFill
        onClick={handleBackClick}
        size={30}
        className={`position-absolute text-warning arrow-back-icon`}
      />
      <img
        src={`/images/playlist-banner.jpeg`}
        height={`250px`}
        width={`100%`}
      />
      <img
        src={
          img === null || img === undefined || img === "" ? defaultFile : img
        }
        className={`rounded-3 position-absolute playlist-cover-pos`}
        width={`200px`}
        height={`200px`}
      />
      <h5 className={`text-white position-absolute album-cover-song-num`}>
        {albumNumber} albums
      </h5>
      <h1
        className={`text-white position-absolute playlist-cover-text-pos-non-edit d-none d-md-block`}
      >
        {artistName}
      </h1>
    </div>
  );
};

export default ArtistBanner;
