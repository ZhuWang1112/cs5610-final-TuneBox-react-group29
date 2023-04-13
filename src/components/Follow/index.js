import React, { useEffect, useState } from "react";
import FollowItem from "./FollowItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteFollow } from "../../reducers/follow-reducer";
import { useParams } from "react-router";
import { findFolloweeIds } from "../../services/follow-service";
import "./index.css";
import {
  findFolloweeThunk,
  updateFolloweeThunk,
  checkFolloweeThunk,
} from "../../services/thunks/follow-thunk";
const Follow = () => {
  const { followeeList, checkFollowee } = useSelector((state) => state.follow);
  const dispatch = useDispatch();

  const loginUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleFollow = (id) => {
    dispatch(
      updateFolloweeThunk({
        user: loginUser._id,
        followId: id,
      })
    );
  };
  const { uid } = useParams();

  useEffect(() => {
    if (!uid && !loginUser) return;
    dispatch(
      checkFolloweeThunk({
        loginUser: loginUser ? loginUser._id : null,
        uid: uid ? uid : loginUser._id,
      })
    );
  }, [uid]);

  return (
    <div className={`mt-5 pe-5 `}>
      <h4 className={`text-white`}>Follows</h4>
      <div className={`follow-container rounded-3`}>
        {followeeList.map((follow, idx) => (
          <FollowItem
            key={follow._id}
            follow={follow}
            isFollow={checkFollowee[idx]}
            handleFollow={handleFollow}
            isSelf={uid ? false : true}
            isLogin={loginUser ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Follow;
