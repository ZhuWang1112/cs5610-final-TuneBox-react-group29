import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AiFillStar } from "react-icons/ai";
const HistoryPanelItem = ({ comment }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  return (
    <div className={`row w-100 p-0 m-0 pt-1`}>
      <div
        className={`col-2 p-0 comment-hover-color`}
        onClick={() => navigate(`/profile/${comment.user._id}`)}
      >
        <div className={`d-flex justify-content-center`}>
          <img src={comment.user.img} width={40} className={`rounded-circle`} />
        </div>
        <div className={`d-flex justify-content-center`}>
          <p className={`mb-0`}>{comment.user.userName}</p>
        </div>
      </div>
      <div
        className={`col-8 p-0 ms-2 me-0`}
        onClick={() => setShowAll(!showAll)}
      >
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

      <div className={`col d-flex align-items-start pe-0`}>
        {comment.rating} <AiFillStar className={`text-warning mt-1 ms-1`} />
      </div>
      <hr className={`mt-2`} />
    </div>
  );
};

export default HistoryPanelItem;
