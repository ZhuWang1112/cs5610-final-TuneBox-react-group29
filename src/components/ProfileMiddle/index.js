import React from "react";
import "./index.css";
import ProfileBanner from "../ProfileBanner";
import PlayList from "../PlayList";
import Comment from "../Comment";
const ProfileMiddle = ({ isSelf }) => {
  return (
    <div className={`profile-middle-bg`}>
      <ProfileBanner isSelf={isSelf} />
      <PlayList isSelf={isSelf} />
      <Comment isSelf={isSelf} />
    </div>
  );
};

export default ProfileMiddle;
