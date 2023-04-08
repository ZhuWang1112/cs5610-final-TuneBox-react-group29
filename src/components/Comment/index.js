import React from "react";
import "./index.css";
import CommentItem from "./CommentItem";
import { useParams } from "react-router";
const Comment = ({ isSelf }) => {
  // const { uid } = useParams();
  // const currentUID = localStorage.getItem("userId");
  // const isSelf = uid === currentUID;
  const data = [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 2 }];
  return (
    <div className={`comment-container`}>
      <h4 className={`text-white`}>Commented Playlist</h4>
      <div className={`comment-inner-container rounded-3 p-2 pt-3`}>
        {data.length === 0 && (
          <div
            className={`d-flex justify-content-center align-items-center comment-empty-tag`}
          >
            <h4 className={`text-muted`}>Your comment plate is blank...</h4>
          </div>
        )}

        {data.length > 0 &&
          data.map((item, idx) => <CommentItem key={idx} isSelf={isSelf} />)}
      </div>
    </div>
  );
};

export default Comment;
