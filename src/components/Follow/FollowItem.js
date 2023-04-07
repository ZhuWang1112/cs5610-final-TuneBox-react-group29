import React from "react";
import "./index.css";
const FollowItem = () => {
  return (
    <div className={`mt-2 row p-3`}>
      <div className={`col-2 d-flex align-items-center`}>
        <img
          src={`/images/follow.png`}
          width={`70px`}
          className={`rounded-pill`}
        />
      </div>
      <div className={`col-5 ms-3 ps-3 d-flex align-items-center`}>
        <div>
          <div className={`fw-bold text-white`}>Name</div>
          <div className={`text-muted`}>34 playlists</div>
        </div>
      </div>
      <div className={`col d-flex align-items-center justify-content-end`}>
        <button className={`btn btn-danger fw-bold`}>Unfollow</button>
      </div>
    </div>
  );
};

export default FollowItem;
