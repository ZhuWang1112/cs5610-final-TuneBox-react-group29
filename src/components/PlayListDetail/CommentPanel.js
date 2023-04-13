import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import StarRatings from "react-star-ratings";
import { createComment } from "../../services/comment-service.js";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import HistoryPanelItem from "./HistoryPanelItem.js";
import { findCommentsByPlaylist } from "../../services/comment-service.js";

const CommentPanel = ({ pRating, setPlaylist }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const recentImg = localStorage.getItem("recent-user-img");
  const [submit, setSubmit] = useState(false);
  const [contentEmptyHint, setContentEmptyHint] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleClear = () => {
    setContent("");
    setRating(0);
  };

  const handleSubmit = async () => {
    if (content === "") {
      setContentEmptyHint(true);
      return;
    }
    setContentEmptyHint(false);
    const newAvgRating =
      ((pRating * comments.length + rating) * 1.0) / (comments.length + 1);

    setSubmit(true);
    setTimeout(() => {
      setSubmit(false);
    }, 2000);
    setPlaylist((p) => ({
      ...p,
      rating: newAvgRating,
    }));

    const newComment = {
      playlist: id,
      user: loginUser._id,
      content: content,
      rating: rating,
      newAvgRating: newAvgRating,
    };
    createComment(newComment);
    const newCommentDetails = {
      ...newComment,
      user: {
        _id: loginUser._id,
        userName: loginUser.userName,
        img: recentImg ? recentImg : loginUser.img,
      },
    };
    setComments([newCommentDetails, ...comments]);
  };

  const fetchComments = async (pid) => {
    const data = await findCommentsByPlaylist(pid);
    console.log("data: ", data);
    setComments(data);
  };
  useEffect(() => {
    fetchComments(id);
  }, [id]);

  return (
    <div className={`m-0 p-0`}>
      {loginUser && (
        <div className={`row w-100 m-0 mt-2`}>
          <div className="col-2">
            <img
              src={recentImg ? recentImg : loginUser.img}
              width={50}
              className={`rounded-circle`}
            />
          </div>
          <div className={`col mt-2 d-flex align-items-center`}>
            <h5 className={`text-white d-inline me-3 mb-0`}>Rating</h5>
            <StarRatings
              rating={rating}
              starRatedColor="yellow"
              starHoverColor="yellow"
              changeRating={(newRating) => setRating(newRating)}
              starDimension="20px"
              starSpacing="3px"
              numberOfStars={5}
              name="rating"
            />
          </div>
        </div>
      )}

      <div className={`row w-100 p-0 m-0 mt-2`}>
        <div className="col">
          {loginUser ? (
            <textarea
              required
              value={content}
              rows={2}
              placeholder="Leave your comments..."
              className="form-control border-0"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          ) : (
            <textarea
              readOnly
              rows={2}
              placeholder="Login in to edit your comments..."
              className="form-control border-0"
            ></textarea>
          )}

          {loginUser && (
            <div className={`mt-1 row w-100`}>
              {contentEmptyHint && (
                <p className={`mb-0 text-warning`}>
                  Please input you comment before submit!
                </p>
              )}
              <div
                className={`col d-flex align-items-center justify-content-center`}
              >
                {submit && (
                  <>
                    <BsFillCheckCircleFill
                      size={30}
                      className={`text-warning`}
                    />
                    <h5 className={`fw-bold text-warning ms-1 p-0 mb-0`}>
                      Submitted
                    </h5>
                  </>
                )}
              </div>
              <div className={`col`}>
                <button
                  className="rounded-pill btn btn-danger float-end mt-1 ps-3 pe-3 fw-bold"
                  onClick={() => handleClear()}
                >
                  Clear
                </button>
                <button
                  className="rounded-pill btn btn-primary float-end mt-1 ps-3 pe-3 fw-bold me-3"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          {!loginUser && (
            <div className={`mt-1 row w-100`}>
              <div
                className={`col d-flex align-items-center justify-content-center`}
              ></div>
              <div className={`col p-0`}>
                <button
                  className="rounded-pill btn btn-danger float-end mt-1 ps-3 pe-3 fw-bold"
                  onClick={() => navigate("/login")}
                >
                  Login To Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`row w-100 text-white m-0 p-0 mt-2`}>
        <div className={`text-warning history-commen-title ps-1`}>
          History comments
        </div>

        <div className={`history-comment bg-dark pt-2 ps-1`}>
          {comments.map((item, idx) => (
            <HistoryPanelItem key={item._id} comment={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentPanel;
