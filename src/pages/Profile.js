import React from 'react'
import ProfileBanner from "../components/ProfileBanner";
import ProfileMiddle from "../components/ProfileMiddle";
import ProfileRight from "../components/ProfileRight";
const Profile = () => {
  return (
    <div className={"row"}>
      <div className={"col-8 ps-0 pe-0"}>
        <ProfileMiddle />
      </div>
      <div className={"col ps-0 pe-0"}>
        <ProfileRight />
      </div>
    </div>
  );
};

export default Profile