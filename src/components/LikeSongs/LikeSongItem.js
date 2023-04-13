import React, { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import "./index.css";
const LikeSongItem = ({ song }) => {
  // console.log("song: ", song);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div
      className={`mx-3 mt-3 position-relative song-item-card`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className={`d-flex justify-content-center`}>
        {/* <img src={song.img} width={80} /> */}
        <img src={`/images/comment-picture.png`} width={100} />
        {isHovering && (
          <AiFillPlayCircle
            className={`position-absolute song-play-icon text-dark`}
            size={40}
          />
        )}
      </div>
      <div className={`d-flex justify-content-center mt-2`}>
        {/* <h5 className={`text-white`}>{song.songName}</h5> */}
        <h5 className={`text-white`}>Song Name</h5>
      </div>
      <div className={`d-flex justify-content-center`}>
        {/* <p className={`mb-0 text-muted`}>{song.artist}</p> */}
        <p className={`m-0 text-muted`}>Artist</p>
      </div>
    </div>
  );
};

export default LikeSongItem;
