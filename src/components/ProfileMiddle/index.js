import React from "react";
import "./index.css";
import ProfileBanner from "../ProfileBanner";
import PlayList from "../PlayList";
import Comment from "../Comment";
import LikeSongs from "../LikeSongs";

const ProfileMiddle = ({ isSelf, isLogin }) => {
  return (
    <div className={`profile-middle-bg`}>
      <ProfileBanner key={Date.now()} />
      {(isLogin || !isSelf) && <PlayList isSelf={isSelf} />}
      {(isLogin || !isSelf) && <LikeSongs />}
      {isSelf && isLogin && <Comment />}
    </div>
  );
};

export default ProfileMiddle;
