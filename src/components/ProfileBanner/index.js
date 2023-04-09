import React, { useState } from "react";
import "./index.css";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { createFollow, deleteFollow } from "../../reducers/follow-reducer";
const ProfileBanner = ({ isSelf }) => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const [hasFollow, setHasFollow] = useState(false);
  const handleFollow = () => {
    setHasFollow(true);
    dispatch(createFollow(uid));
  };
  const handleUnFollow = () => {
    setHasFollow(false);
    dispatch(deleteFollow(uid));
  };
  return (
    <div>
      <div className={`d-flex justify-content-start position-relative`}>
        <img
          src={`/images/profile_banner.jpg`}
          width="90%"
          height="300px"
          className={`m-0 rounded-5`}
        />
        <img
          src={`/images/profile-avatar.jpeg`}
          width="100px"
          className={`position-absolute avatar-position rounded-pill`}
        />
        <h5 className={`position-absolute text-white username-position`}>
          {uid}
        </h5>
        {isSelf && (
          <>
            <p className={`position-absolute text-muted email-position`}>
              cst950928@hotmail.com
            </p>
            <button
              className={`btn btn-muted border border-warning position-absolute edit-position text-white`}
            >
              Edit Profile
            </button>
          </>
        )}
        {!isSelf && !hasFollow && (
          <button
            className={`btn btn-muted border border-warning position-absolute edit-position text-white`}
            onClick={() => handleFollow()}
          >
            + Follow
          </button>
        )}
        {!isSelf && hasFollow && (
          <button
            className={`btn btn-muted border border-warning position-absolute edit-position text-white`}
            onClick={() => handleUnFollow()}
          >
            + UnFollow
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileBanner;
