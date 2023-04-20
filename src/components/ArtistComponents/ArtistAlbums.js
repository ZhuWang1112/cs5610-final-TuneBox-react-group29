import React from "react";
import { useNavigate } from "react-router";
import { MdDateRange, MdOutlineFormatListNumberedRtl } from "react-icons/md";
import AlbumItem from "./AlbumItem.js";

const ArtistAlbums = ({ albums }) => {
  const navigate = useNavigate();
  const artistAlbumClick = (albumId, albumTitle) => {
    navigate(`/details/album/${albumId}`, { state: { title: albumTitle } });
  };
  
  return (
    <div className={`position-relative`}>
      <div className={`row mt-3 m-0 p-0 w-100 d-flex justify-content-center`}>
        <div className={`col col-xxl-10 col-xl-10 col-lg-10`}>
          <div className={`row w-100 p-0 m-0`}>
            <div className={`col`}>
              <h5 className={`fw-fold text-white`}># Album Name</h5>
            </div>
            <div className={`col-2 text-muted d-flex justify-content-start`}>
              <MdDateRange size={30} />
            </div>
            <div className={`col-3 text-muted`}>
              <MdOutlineFormatListNumberedRtl size={30} />
            </div>
            <div className={`col-1 col-lg-2 col-xl-2 col-xxl-2`}></div>
          </div>
        </div>
      </div>
      <div className={`row m-0 p-0 w-100 d-flex justify-content-center`}>
        <div className={`col col-xxl-10 col-xl-10 col-lg-10`}>
          {albums.map((album, idx) => (
            <AlbumItem
              key={album.apiAlbumId}
              album={album}
              artistAlbumClick={artistAlbumClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistAlbums;
