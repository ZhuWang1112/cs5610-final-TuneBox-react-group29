import React from "react";
import "./index.css";
import { useNavigate } from "react-router";
const FollowItem = ({ follow, handleUnfollow, isSelf }) => {
  const navigate = useNavigate();
  const visitOtherProfile = () => {
    navigate(`/profile/${follow._id}`);
  };
  return (
    <div className={`mt-2 row p-3`}>
      <div
        className={`${
          isSelf ? `col-2` : `col-3 ms-3`
        } d-flex align-items-center`}
      >
        <img
          src={`/images/${follow.img}`}
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
          <div className={`fw-bold text-white`}>{follow.name}</div>
          <div className={`text-muted`}>{follow.playlistNum} playlists</div>
        </div>
      </div>
      {isSelf && (
        <div className={`col d-flex align-items-center justify-content-end`}>
          <button
            className={`btn btn-danger fw-bold`}
            onClick={() => handleUnfollow(follow._id)}
          >
            Unfollow
          </button>
        </div>
      )}
    </div>
  );
};

export default FollowItem;
