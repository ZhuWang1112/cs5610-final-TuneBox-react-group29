import React from "react";
import FollowItem from "./FollowItem";
import "./index.css";
const Follow = () => {
  const followList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  return (
    <div className={`mt-5 pe-5 `}>
      <h4 className={`text-white`}>Follows</h4>
      <div className={`follow-container rounded-3`}>
        {followList.map(() => (
          <FollowItem />
        ))}
      </div>
    </div>
  );
};

export default Follow;
