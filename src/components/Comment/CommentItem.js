import React, { useState } from "react";
import "./index.css";
import { AiOutlineEllipsis } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";
const CommentItem = () => {
  const [showMore, toggleShowMore] = useState(false);
  return (
    <div className={`mt-2 border-width container position-relative`}>
      <div className={`row me-5`}>
        <div className={`col-1 d-flex justify-content-center ms-3 me-3`}>
          <img
            src={`/images/comment-picture.png`}
            width={`50px`}
            height={`50px`}
          />
        </div>

        <div className={`text-white col`}>
          <div className={`row w-100 d-flex align-items-center`}>
            <span className={`text-white d-inline col-3`}>
              <div className={`fw-bold`}>Song Name</div>
              <div className={`text-muted`}>Artist</div>
            </span>
            <span className={`d-inline col`}>Rating</span>
          </div>
          {showMore && (
            <>
              <p className={`mb-1`}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
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
              <p className={`description mb-1`}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
              <div
                className={`float-end text-warning mb-2`}
                onClick={() => toggleShowMore(true)}
              >
                More
                <AiOutlineEllipsis size={20} />
              </div>
            </>
          )}
        </div>
        <hr className={"text-muted"} />
      </div>
      <RiDeleteBinFill
        size={25}
        className={`text-muted position-absolute comment-delete-icon`}
      />
    </div>
  );
};

export default CommentItem;
