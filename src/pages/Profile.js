import React, { useEffect, useState } from "react";
import ProfileBanner from "../components/ProfileBanner";
import ProfileMiddle from "../components/ProfileMiddle";
import ProfileRight from "../components/ProfileRight";
import { useParams } from "react-router";

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logoutThunk} from "../services/users/users-thunks";

import { findUser } from "../services/user-service";

import { updateProfile } from "../reducers/user-reducer";

const Profile = () => {
  const { uid } = useParams();
  let loginUser = localStorage.getItem("currentUser");
  if (loginUser) {
    loginUser = JSON.parse(loginUser);
  }

  const dispatch = useDispatch();

  const [login, setLogin] = useState(null);
  const fetchUser = async (uid) => {
    const user = await findUser(uid);
    setLogin(user);
    dispatch(updateProfile(user));
  };

  useEffect(() => {
    if (loginUser) {
      fetchUser(uid);
    }
  }, [uid]);

  return (
    <div className={"row"}>
      <div className={"col-8 ps-0 pe-0"}>
        {login && <ProfileMiddle isSelf={uid === loginUser._id} />}
      </div>
      <div className={"col ps-0 pe-0"}>
        {login && <ProfileRight isSelf={uid === loginUser._id} />}
      </div>
      {uid === "default" && <div className={`text-white`}>Please login</div>}
    </div>
  );
};

export default Profile;
