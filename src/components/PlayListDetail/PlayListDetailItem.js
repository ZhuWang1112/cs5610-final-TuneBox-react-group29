import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
const PlayListDetailItem = ({ song, handleUnLikeClick }) => {
  return (
    <div className={`mt-3 ms-3 me-3`}>
      <div className={`row`}>
        <div className={`col-4`}>
          <img
            src={`/images/comment-picture.png`}
            height={`80px`}
            width={`80px`}
          />
          <h5 className={`ms-3 text-white fw-fold d-inline`}>{song}</h5>
        </div>
        <div className={`col-2 text-muted d-flex align-items-center ps-0`}>
          <h5 className={`text-white fw-fold d-inline`}>Shutong Chen</h5>
        </div>
        <div className={`col-2 text-muted d-flex align-items-center ps-0`}>
          <h5 className={`text-muted fw-fold`}>4:09</h5>
        </div>
        <div className={`col-2 d-flex align-items-center ps-0`}>
          <AiFillHeart
            size={30}
            className={`text-danger`}
            onClick={() => handleUnLikeClick(song)}
          />
        </div>
        <div className={`col d-flex align-items-center ps-0`}>
          <BsFillPlayCircleFill size={30} className={`text-success`} />
        </div>
      </div>
    </div>
  );
};

export default PlayListDetailItem;