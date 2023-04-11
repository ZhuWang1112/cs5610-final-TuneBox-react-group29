import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router";
const FollowItem = ({ follow, isFollow, handleFollow, isSelf }) => {
  const navigate = useNavigate();
  const visitOtherProfile = () => {
    navigate(`/profile/${follow._id}`);
  };
  // console.log("follow: ", follow);
  // console.log("check: ", isFollow);
  const [isFollow_, setIsFollow] = useState(isFollow);
  // console.log("isFollow_: ", isFollow_);
  const handleFollowWithStateChange = () => {
    handleFollow(follow._id);
    setIsFollow(!isFollow_);
  };
  return (
    <div className={`mt-2 row p-3`}>
      <div
        className={`${
          isSelf ? `col-2` : `col-3 ms-3`
        } d-flex align-items-center`}
      >
        <img
          src={follow.img}
          width={`70px`}
          className={`rounded-pill`}
          onClick={() => visitOtherProfile()}
        />
      </div>
      <div
        className={`${
          isSelf ? `col-5` : `col`
        } ms-3 ps-3 d-flex align-items-center`}
      >
        <div>
          <div className={`fw-bold text-white`}>{follow.userName}</div>
          <div className={`text-muted`}>{follow.playlistsCount} playlists</div>
        </div>
      </div>
      <div className={`col d-flex align-items-center justify-content-end`}>
        {isSelf || isFollow_ ? (
          <button
            className={`btn btn-danger fw-bold`}
            onClick={() => handleFollowWithStateChange()}
          >
            Unfollow
          </button>
        ) : (
          <button
            className={`btn btn-primary fw-bold`}
            onClick={() => handleFollowWithStateChange()}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default FollowItem;
