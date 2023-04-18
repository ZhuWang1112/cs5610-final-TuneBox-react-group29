import React from "react";
import { MdRemoveCircle } from "react-icons/md";
import "./index.css";

const PlayListItem = ({ playlist, handleClick, deletePlaylist, isSelf }) => {
  return (
    <div className={`ms-1 me-2 position-relative playlist-item-div`}>
      <img
        src={playlist.img}
        className={`rounded-3`}
        width={`180px`}
        height={`180px`}
        onClick={() => handleClick(playlist._id)}
      />
      {isSelf && !playlist.isDefault && (
        <MdRemoveCircle
          size={25}
          className={`position-absolute remove-icon p-0`}
          onClick={() => deletePlaylist(playlist)}
        />
      )}

      <p className={`text-white mt-2 mb-0 playlist-name text-nowrap`}>
        {playlist.playListName}
      </p>
      {/* <p className={`text-muted pt-0`}>{playlist.songs.length} songs</p> */}
    </div>
  );
};

export default PlayListItem;
