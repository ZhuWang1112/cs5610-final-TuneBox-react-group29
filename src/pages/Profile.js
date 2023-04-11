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
  const currentUID = localStorage.getItem("userId");
  const isSelf = uid === currentUID;
  const dispatch = useDispatch();

  const navigate = useNavigate();


  const [profile, setProfile] = useState(null);
  const fetchUser = async (uid) => {
    const user = await findUser(uid);
    console.log("current user: ", user);
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
        <button
            className="btn btn-danger"
            onClick={() => {
                dispatch(logoutThunk());
                navigate("/login");
            }}
        >
            Logout
        </button>
    </div>
  );
};

export default Profile;
