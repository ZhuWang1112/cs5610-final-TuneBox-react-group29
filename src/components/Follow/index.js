import React from "react";
import FollowItem from "./FollowItem";
import { useSelector, useDispatch } from "react-redux";
import { deleteFollow } from "../../reducers/follow-reducer";
import { useParams } from "react-router";
import "./index.css";
const Follow = ({ isSelf }) => {
  const followList = useSelector((state) => state.follow);
  const dispatch = useDispatch();
  const handleUnfollow = (id) => {
    dispatch(deleteFollow(id));
  };
  const { uid } = useParams();
  return (
    <div className={`mt-5 pe-5 `}>
      <h4 className={`text-white`}>{!isSelf && uid} Follows</h4>
      <div className={`follow-container rounded-3`}>
        {followList.map((follow, idx) => (
          <FollowItem
            key={follow.id}
            follow={follow}
            handleUnfollow={handleUnfollow}
            isSelf={isSelf}
          />
        ))}
      </div>
    </div>
  );
};

export default Follow;
