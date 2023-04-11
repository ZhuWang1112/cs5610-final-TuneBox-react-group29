import React, { useEffect, useState } from "react";
import ProfileBanner from "../components/ProfileBanner";
import ProfileMiddle from "../components/ProfileMiddle";
import ProfileRight from "../components/ProfileRight";
import { useParams } from "react-router";
import { findUser } from "../services/user-service";
import { useDispatch } from "react-redux";
import { updateProfile } from "../reducers/user-reducer";
const Profile = () => {
  const { uid } = useParams();
  const currentUID = localStorage.getItem("userId");
  const isSelf = uid === currentUID;
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const fetchUser = async (uid) => {
    const user = await findUser(uid);
    setProfile(user);
    dispatch(updateProfile(user));
  };

  useEffect(() => {
    if (!currentUID) {
      setProfile({});
    } else {
      fetchUser(uid);
    }
  }, [uid]);
  return (
    <div className={"row"}>
      <div className={"col-8 ps-0 pe-0"}>
        {profile && <ProfileMiddle isSelf={isSelf} />}
      </div>
      <div className={"col ps-0 pe-0"}>
        {profile && <ProfileRight isSelf={isSelf} />}
      </div>
    </div>
  );
};

export default Profile;
