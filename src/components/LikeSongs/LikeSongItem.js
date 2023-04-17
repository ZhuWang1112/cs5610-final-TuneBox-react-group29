import React, { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { MdRemoveCircle } from "react-icons/md";
import "./index.css";
const LikeSongItem = ({ song, handleRemoveSong, isSelf }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div className={`mx-2 mt-3 position-relative song-item-div`}>
      {isSelf && (
        <div className={`position-absolute song-remove-icon p-0`}>
          <MdRemoveCircle size={25} onClick={() => handleRemoveSong(song)} />
        </div>
      )}
      <div className={`d-flex justify-content-center`}>
        <div
          className={`d-flex justify-content-center song-item-card`}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img src={song.img} width={110} height={110} />
          {/* <img src={`/images/comment-picture.png`} width={110} height={110} /> */}
          {isHovering && (
            <AiFillPlayCircle
              className={`position-absolute song-play-icon text-dark`}
              size={40}
            />
          )}
        </div>
      </div>

      <div className={`d-flex justify-content-start mt-2`}>
        <h5 className={`text-white text-nowrap song-item-name`}>
          {song.songName}
        </h5>
        {/* <div className={`text-white text-nowrap`}>
          Song Name Name Song Name Name
        </div> */}
      </div>
      <div className={`d-flex justify-content-start`}>
        <p className={`mb-0 text-muted text-nowrap song-item-artist`}>
          {song.artist}
        </p>
        {/* <p className={`m-0 text-muted`}>Artist</p> */}
      </div>
    </div>
  );
};

export default LikeSongItem;
