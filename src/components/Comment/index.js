import React, { useEffect } from "react";
import "./index.css";
import CommentItem from "./CommentItem";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../reducers/comment-reducer";
import {
  findCommentsThunk,
  deleteCommentThunk,
} from "../../services/thunks/comment-thunk.js";
const Comment = ({ isSelf }) => {
  const { uid } = useParams();
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  // const { uid } = useParams();
  // const currentUID = localStorage.getItem("userId");
  // const isSelf = uid === currentUID;
  const handleDelete = (id) => {
    dispatch(deleteCommentThunk(id));
  };

  useEffect(() => {
    dispatch(findCommentsThunk(uid));
  }, []);
  return (
    <div className={`comment-container`}>
      <h4 className={`text-white`}>Commented Playlist</h4>
      <div className={`comment-inner-container rounded-3 p-2 pt-3`}>
        {comments.length === 0 && (
          <div
            className={`d-flex justify-content-center align-items-center comment-empty-tag`}
          >
            <h4 className={`text-muted`}>Your comment plate is blank...</h4>
          </div>
        )}

        {comments.length > 0 &&
          comments.map((comment, idx) => (
            <CommentItem
              key={idx}
              isSelf={isSelf}
              comment={comment}
              handleDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
