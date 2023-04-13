import React, { useEffect, useState } from "react";
import ProfileBanner from "../components/ProfileBanner";
import ProfileMiddle from "../components/ProfileMiddle";
import ProfileRight from "../components/ProfileRight";
import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../services/users/users-thunks";

import { findUser } from "../services/user-service";

import { updateProfile } from "../reducers/profile-reducer";
import { findProfileThunk } from "../services/thunks/profile-thunk";
import { findUserByIdThunk } from "../services/users/users-thunks";
import { findProfileSongsThunk } from "../services/thunks/like-thunk";
const Profile = () => {
  const { uid } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);

  const fetchProfile = async (uid) => {
    const response = await dispatch(
      findProfileThunk(uid ? uid : loginUser._id)
    );
    setProfile(response.payload);
  };

  useEffect(() => {
    if (!loginUser && !uid) {
      setProfile({});
      return;
    }
    // fetch current login user
    if (loginUser) {
      dispatch(findUserByIdThunk(loginUser._id));
    }
    // fetch current profile
    fetchProfile(uid);
    dispatch(findProfileSongsThunk(uid ? uid : loginUser._id));
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
