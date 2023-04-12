import React, { useEffect, useState } from "react";
import ProfileBanner from "../components/ProfileBanner";
import ProfileMiddle from "../components/ProfileMiddle";
import ProfileRight from "../components/ProfileRight";
import { useParams } from "react-router";

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logoutThunk} from "../services/users/users-thunks";

import { findUser } from "../services/user-service";

import { updateProfile } from "../reducers/profile-reducer";
import { findProfileThunk } from "../services/thunks/profile-thunk";

const Profile = () => {
  const { uid } = useParams();
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const fetchUser = async (uid) => {
    const response = await dispatch(
      findProfileThunk(uid ? uid : loginUser._id)
    );
    setProfile(response.payload);
  };

  useEffect(() => {
    if (uid || loginUser) {
      fetchUser(uid);
    } else {
      setProfile({});
    }
  }, [uid]);

  return (
    <div className={"row"}>
      <div className={`${loginUser || uid ? `col-8` : `col`} ps-0 pe-0`}>
        {profile && (
          <ProfileMiddle
            isSelf={uid ? false : true}
            isLogin={loginUser ? true : false}
          />
        )}
      </div>
      {(loginUser || uid) && (
        <div className={"col ps-0 pe-0"}>
          {profile && <ProfileRight isSelf={uid ? false : true} />}
        </div>
      )}
    </div>
  );
};

export default Profile;
