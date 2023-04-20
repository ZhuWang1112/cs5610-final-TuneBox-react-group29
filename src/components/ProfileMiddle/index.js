import React, { useState, useEffect } from "react";
import "./index.css";
import ProfileBanner from "../ProfileBanner";
import PlayList from "../PlayList";
import Comment from "../Comment";
import LikeSongs from "../LikeSongs";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  deleteComment as deleteCommentService,
  findComments as findCommentService,
} from "../../services/comment-service";

const ProfileMiddle = ({ isSelf, isLogin }) => {
  const { uid } = useParams();
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const findComments = async (id) => {
    const data = await findCommentService(id);
    setComments(data);
  };

  useEffect(() => {
    if (!isSelf || !isLogin || !currentUser) return;
    findComments(currentUser._id);
  }, [uid]);

  return (
    <div className={`profile-middle-bg`}>
      <ProfileBanner />
      {(isLogin || !isSelf) && (
        <PlayList isSelf={isSelf} setComments={setComments} />
      )}
      {(isLogin || !isSelf) && <LikeSongs />}
      {isSelf && isLogin && (
        <Comment comments={comments} setComments={setComments} />
      )}
    </div>
  );
};

export default ProfileMiddle;
