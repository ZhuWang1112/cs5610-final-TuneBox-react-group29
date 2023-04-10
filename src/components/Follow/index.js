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
const Follow = ({ isSelf }) => {
  const { followeeList, checkFollowee } = useSelector((state) => state.follow);
  console.log("followList", followeeList);
  const dispatch = useDispatch();
  const loginUser = localStorage.getItem("userId");
  // const getFolloweeOfLoginUser = async () => {
  //   const followIds = await findFolloweeIds(loginUser);
  // };
  const handleFollow = (id) => {
    dispatch(
      updateFolloweeThunk({
        user: loginUser,
        followId: id,
      })
    );
  };
  const { uid } = useParams();

  useEffect(() => {
    dispatch(checkFolloweeThunk({ loginUser: loginUser, uid: uid }));
  }, [uid, loginUser]);
  return (
    <div className={`mt-5 pe-5 `}>
      <h4 className={`text-white`}>{!isSelf && uid} Follows</h4>
      <div className={`follow-container rounded-3`}>
        {followeeList.map((follow, idx) => (
          <FollowItem
            key={follow.id}
            follow={follow}
            isFollow={checkFollowee[idx]}
            handleFollow={handleFollow}
            isSelf={isSelf}
          />
        ))}
      </div>
    </div>
  );
};

export default Follow;
