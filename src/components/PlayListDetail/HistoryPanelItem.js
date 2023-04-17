import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
const HistoryPanelItem = ({ comment }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className={`row w-100 p-0 m-0 pt-1`}>
      <div
        className={`col-2 p-0 comment-hover-color ms-2`}
        onClick={() =>
          navigate(
            `/profile${
              comment.user._id === currentUser._id ? `` : `/${comment.user._id}`
            }`
          )
        }
      >
        <div className={`d-flex justify-content-start`}>
          <img src={comment.user.img} width={40} className={`rounded-circle`} />
        </div>
        <div className={`d-flex justify-content-center`}>
          <p className={`mb-0 comment-user-name-div text-nowarp`}>
            {comment.user.userName}
          </p>
        </div>
      </div>
      <div className={`col p-0 ms-2 me-0`} onClick={() => setShowAll(!showAll)}>
        {showAll && <div className={``}>{comment.content}</div>}
        {!showAll && (
          <div
            className={`comment-content ${
              comment.user.isVip ? `text-warning` : `text-white`
            }`}
          >
            {comment.content}
          </div>
        )}
      </div>

      <div className={`col-2 d-flex align-items-start pe-0`}>
        {comment.rating} <AiFillStar className={`text-warning mt-1 ms-1`} />
      </div>
      <hr className={`mt-2`} />
    </div>
  );
};

export default HistoryPanelItem;
