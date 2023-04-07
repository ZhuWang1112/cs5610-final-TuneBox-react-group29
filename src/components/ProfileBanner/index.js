import React from "react";
import "./index.css";
const ProfileBanner = () => {
  return (
    <div>
      <div className={`d-flex justify-content-start position-relative`}>
        <img
          src={`./images/profile_banner.jpg`}
          width="90%"
          height="300px"
          className={`m-0 rounded-5`}
        />
        <img
          src={`./images/profile-avatar.jpeg`}
          width="100px"
          className={`position-absolute avatar-position rounded-pill`}
        />
        <h5 className={`position-absolute text-white username-position`}>
          Shutong Chen
        </h5>
      </div>
    </div>
  );
};

export default ProfileBanner;
