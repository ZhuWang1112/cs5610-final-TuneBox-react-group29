import React from "react";
import "./index.css";
import ProfileBanner from "../ProfileBanner";
import PlayList from "../PlayList";
import Comment from "../Comment";
const ProfileMiddle = ({ isSelf }) => {
  return (
    <div className={`profile-middle-bg`}>
      <ProfileBanner key={Date.now()} isSelf={isSelf} />
      <PlayList isSelf={isSelf} />
      {isSelf && <Comment />}
    </div>
  );
};

export default ProfileMiddle;
