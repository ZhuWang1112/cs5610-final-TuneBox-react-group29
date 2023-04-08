import React from "react";
import { MdRemoveCircle } from "react-icons/md";
import "./index.css";

const PlayListItem = ({ playlist, handleClick, deletePlaylist, isSelf }) => {
  return (
    <div className={`ms-1 me-2 position-relative`}>
      <img
        src={`/images/playlist-cover.jpeg`}
        className={`rounded-3`}
        width={`200px`}
        onClick={() => handleClick(playlist._id)}
      />
      {isSelf && (
        <MdRemoveCircle
          size={25}
          className={`position-absolute remove-icon`}
          onClick={() => deletePlaylist(playlist._id)}
        />
      )}

      <p className={`text-white mt-2 mb-0 playlist-name`}>{playlist.name}</p>
      <p className={`text-muted pt-0`}>{playlist.songs.length} songs</p>
    </div>
  );
};

export default PlayListItem;
