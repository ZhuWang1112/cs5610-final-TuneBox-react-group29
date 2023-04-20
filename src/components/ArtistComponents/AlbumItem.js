import React from "react";
import "./index.css";
import { AiOutlineEllipsis } from "react-icons/ai";
const AlbumItem = ({ album, artistAlbumClick }) => {
  return (
    <div className={`row w-100 p-0 m-0 mt-3`}>
      <div
        className={`col d-flex align-items-center text-white album-title-div text-nowrap`}
      >
        <img src={album.img} height={`50px`} width={`50px`} />
        <h5 className={`ms-3`}>{album.title}</h5>
      </div>
      <div
        className={`col-2 text-muted d-flex justify-content-start align-items-center`}
      >
        {album.date}
      </div>
      <div
        className={`col-3 text-warning d-flex  d-flex justify-content-start align-items-center`}
      >
        {album.tracksNum} songs
      </div>

      <div className={`col-2 align-items-center d-none d-lg-flex`}>
        <button
          className={`btn btn-warning text-white fw-bold`}
          onClick={() => artistAlbumClick(album.apiAlbumId, album.title)}
        >
          See More
        </button>
      </div>
      <div
        className={`col-1 d-flex align-items-center text-warning d-flex d-xxl-none d-xl-none d-lg-none`}
      >
        <AiOutlineEllipsis
          size={30}
          onClick={() => artistAlbumClick(album.apiAlbumId, album.title)}
        />
      </div>
    </div>
  );
};

export default AlbumItem;
