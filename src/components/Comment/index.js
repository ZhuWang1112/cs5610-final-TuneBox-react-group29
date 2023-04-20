import React, { useEffect, useState } from "react";
import "./index.css";
import CommentItem from "./CommentItem";
import { useNavigate, useParams } from "react-router";
import {
  deleteComment as deleteCommentService,
  findComments as findCommentService,
} from "../../services/comment-service";
import { useSelector } from "react-redux";

const Comment = ({ comments, setComments }) => {
  const { uid } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const loginId = currentUser ? currentUser._id : null;
  const navitate = useNavigate();

  const handleDelete = (commentObj) => {
    setComments((prev) => prev.filter((p) => p._id !== commentObj._id));
    deleteCommentService(commentObj);
  };
  const visitPlaylist = (pid) => {
    navitate(`/details/playlist/${pid}`);
  };

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
