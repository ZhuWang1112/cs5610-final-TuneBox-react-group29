import React from 'react'
import ProfileBanner from "../components/ProfileBanner";
import ProfileMiddle from "../components/ProfileMiddle";
import ProfileRight from "../components/ProfileRight";
import { useParams } from "react-router";
const Profile = () => {
  const { uid } = useParams();
  const currentUID = localStorage.getItem("userId");
  const isSelf = uid === currentUID;
  return (
    <div className={"row"}>
      <div className={"col-8 ps-0 pe-0"}>
        <ProfileMiddle isSelf={isSelf} />
      </div>
      <div className={"col ps-0 pe-0"}>
        <ProfileRight isSelf={isSelf} />
      </div>
    </div>
  );
};

export default Profile