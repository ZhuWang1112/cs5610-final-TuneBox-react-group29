import React, { useState } from "react";
import "./index.css";
import { AiOutlineEllipsis } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
import StarRatings from "react-star-ratings";

const CommentItem = ({comment, handleDelete, visitPlaylist }) => {
  const [showMore, toggleShowMore] = useState(false);
  return (
    <div className={`mt-2 border-width position-relative p-0`}>
      <div className={`row me-5`}>
        <div className={`col-1 d-flex justify-content-center ms-3`}>
          <img src={comment.userImg} width={`50px`} height={`50px`} />
        </div>

        <div className={`text-white col`}>
          <div className={`row w-100 d-flex align-items-center`}>
            <span className={`text-white d-inline col-3`}>
              <div
                className={`fw-bold visit-playlist`}
                onClick={() => visitPlaylist(comment.playlist)}
              >
                {comment.playListName}
              </div>
              <div className={`text-muted`}>{comment.userName}</div>
            </span>
            <span className={`d-inline col`}>
              <StarRatings
                rating={comment.rating}
                starRatedColor="orange"
                starDimension="20px"
                starSpacing="5px"
                isSelectable={false}
                numberOfStars={5}
              />
            </span>
          </div>
          {showMore && (
            <>
              <p className={`mb-1`}>{comment.content}</p>
              <div
                className={`float-end text-warning mb-2`}
                onClick={() => toggleShowMore(false)}
              >
                Show Less
              </div>
            </>
          )}
          {!showMore && (
            <>
              <p className={`description mb-1`}>{comment.content}</p>
              <div
                className={`float-end text-warning mb-2`}
                onClick={() => toggleShowMore(true)}
              >
                More
                <AiOutlineEllipsis size={20} className={`p-0`} />
              </div>
            </>
          )}
        </div>
        <hr className={"text-muted"} />
      </div>
      <RiDeleteBinFill
        size={25}
        className={`position-absolute comment-delete-icon p-0`}
        onClick={() => handleDelete(comment)}
      />
    </div>
  );
};

export default CommentItem;
