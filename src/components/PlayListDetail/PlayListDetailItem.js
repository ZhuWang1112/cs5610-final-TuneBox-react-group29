import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
const PlayListDetailItem = ({
  id,
  song,
  showDelete,
  handleUnLikeClick,
  handleDelete,
}) => {
  const { checkSong } = useSelector((state) => state.likedSong);
  console.log("checkSong in detail, ", checkSong);
  return (
    <div className={`mt-3 ms-3 me-3`}>
      <div className={`row`}>
        <div className={`col-4`}>
          <img src={`/images/${song.img}`} height={`80px`} width={`80px`} />
          <h5 className={`ms-3 text-white fw-fold d-inline`}>
            {song.songName}
          </h5>
        </div>
        <div className={`col-2 text-muted d-flex align-items-center ps-0`}>
          <h5 className={`text-white fw-fold d-inline`}>{song.artist}</h5>
        </div>
        <div className={`col-2 text-muted d-flex align-items-center ps-0`}>
          <h5 className={`text-muted fw-fold`}>{song.duration}</h5>
        </div>
        <div className={`col d-flex align-items-center ps-0`}>
          {checkSong[id] && (
            <AiFillHeart
              size={30}
              className={`text-danger`}
              onClick={() => handleUnLikeClick(id, song._id)}
            />
          )}
          {!checkSong[id] && (
            <AiOutlineHeart
              size={30}
              className={`text-muted`}
              onClick={() => handleUnLikeClick(id, song._id)}
            />
          )}
        </div>
        <div className={`col d-flex align-items-center ps-0`}>
          <BsFillPlayCircleFill size={30} className={`text-success`} />
        </div>
        {showDelete && (
          <div className={`col d-flex align-items-center`}>
            <RiDeleteBin5Fill
              size={30}
              className={`text-danger`}
              onClick={() => handleDelete(id, song._id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayListDetailItem;
