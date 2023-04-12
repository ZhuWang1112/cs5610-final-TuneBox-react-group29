import React, { useEffect } from "react";
import "./index.css";
import CommentItem from "./CommentItem";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../reducers/comment-reducer";

import {
  findCommentsThunk,
  deleteCommentThunk,
} from "../../services/thunks/comment-thunk.js";
const Comment = () => {
  const { uid } = useParams();
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const navitate = useNavigate();
  const handleDelete = (id) => {
    dispatch(deleteCommentThunk(id));
  };
  const visitPlaylist = (pid) => {
    navitate(`/playlist/${pid}`);
  };
  useEffect(() => {
    dispatch(findCommentsThunk(loginUser._id));
  }, [loginUser._id]);
  return (
    <div className={`comment-container`}>
      <h4 className={`text-white`}>Commented Playlist</h4>
      <div className={`comment-inner-container rounded-3 p-2 pt-3`}>
        {comments.length === 0 && (
          <div
            className={`d-flex justify-content-center align-items-center comment-empty-tag`}
          >
            <h4 className={`text-muted`}>The comment plate is blank...</h4>
          </div>
        )}

        {comments.length > 0 &&
          comments.map((comment, idx) => (
            <CommentItem
              key={idx}
              comment={comment}
              handleDelete={handleDelete}
              visitPlaylist={visitPlaylist}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
