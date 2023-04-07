import React from "react";
import { MdRemoveCircle } from "react-icons/md";
import "./index.css";
const PlayListItem = ({ playlist }) => {
  const isDefault = playlist.name === "Default playlist";
  return (
    <div className={`ms-1 me-2 position-relative`}>
      <img
        src={`/images/playlist-cover.jpeg`}
        className={`rounded-3`}
        width={`200px`}
      />
      {!isDefault && (
        <MdRemoveCircle
          size={25}
          className={`position-absolute text-muted remove-icon`}
        />
      )}

      <p className={`text-white mt-2 mb-0`}>{playlist.name}</p>
      <p className={`text-muted pt-0`}>{playlist.song} songs</p>
    </div>
  );
};

export default PlayListItem;
