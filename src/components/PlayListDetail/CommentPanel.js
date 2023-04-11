import React, { useState } from "react";
import { useParams } from "react-router";
import StarRatings from "react-star-ratings";
import { createComment } from "../../services/comment-service.js";
import { BsFillCheckCircleFill } from "react-icons/bs";
const CommentPanel = () => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const loginUser = localStorage.getItem("userId");
  const [submit, setSubmit] = useState(false);
  const { id } = useParams();
  const handleClear = () => {
    setContent("");
    setRating(0);
  };

  const handleSubmit = async () => {
    const newComment = {
      playlist: id,
      user: loginUser,
      content: content,
      rating: rating,
    };
    setSubmit(true);
    await createComment(newComment);
  };
  return (
    <div className={`m-0 p-0`}>
      <div className={`row w-100 m-0 mt-3`}>
        <div className="col-2">
          <img src="/images/profile-avatar.jpeg" width={60} />
        </div>
        <div className={`col p-0 text-white d-flex align-items-end ms-2`}>
          <h5>{loginUser}</h5>
        </div>
      </div>

      <div className={`ms-3 mt-2 d-flex align-items-center`}>
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

      <div className={`row w-100 p-0 m-0 mt-3`}>
        <div className="col">
          <textarea
            value={content}
            rows={8}
            placeholder="Leave your comments..."
            className="form-control border-0"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <div className={`mt-3 row w-100`}>
            <div
              className={`col d-flex align-items-center justify-content-center`}
            >
              {submit && (
                <>
                  <BsFillCheckCircleFill size={30} className={`text-warning`} />
                  <h5 className={`fw-bold text-warning ms-2 p-0 mb-0`}>
                    Submitted
                  </h5>
                </>
              )}
            </div>
            <div className={`col`}>
              <button
                className="rounded-pill btn btn-danger float-end mt-2 ps-3 pe-3 fw-bold"
                onClick={() => handleClear()}
              >
                Clear
              </button>
              <button
                className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold me-3"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentPanel;
