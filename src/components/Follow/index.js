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
  const { currentUser } = useSelector((state) => state.user);
  const handleFollow = (id) => {
    dispatch(
      updateFolloweeThunk({
        user: currentUser._id,
        followId: id,
      })
    );
  };
  const { uid } = useParams();

  useEffect(() => {
    if (!uid && !currentUser) return;
    dispatch(
      checkFolloweeThunk({
        loginUser: currentUser ? currentUser._id : null,
        uid: uid ? uid : currentUser._id,
      })
    );
  }, [uid]);

  return (
    <div className={`mt-5 pe-3 `}>
      <h4 className={`text-white`}>Follows</h4>
      <div className={`follow-container rounded-3`}>
        {followeeList.map((follow, idx) => (
          <FollowItem
            key={follow._id + uid}
            follow={follow}
            isFollow={checkFollowee[idx]}
            handleFollow={handleFollow}
            isSelf={uid ? false : true}
            isLogin={currentUser ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default Follow;
