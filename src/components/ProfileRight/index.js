import React from "react";
import Premium from "./Premium";
import Follow from "../Follow";
const ProfileRight = ({ isSelf }) => {
  return (
    <div>
      {isSelf && <Premium />}
      <Follow />
    </div>
  );
};

export default ProfileRight;
