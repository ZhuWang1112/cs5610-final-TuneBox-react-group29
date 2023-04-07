import React from "react";
import "./index.css";
import ProfileBanner from "../ProfileBanner";
import PlayList from "../PlayList";
import Comment from "../Comment";
const ProfileMiddle = () => {
  return (
    <div className={`profile-middle-bg`}>
      <ProfileBanner />
      <PlayList />
      <Comment />
    </div>
  );
};

export default ProfileMiddle;
