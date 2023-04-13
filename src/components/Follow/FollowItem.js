import React, { useState, useRef } from "react";
import "./index.css";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from "react-bootstrap/Overlay";
const FollowItem = ({ follow, isFollow, handleFollow, isSelf, isLogin }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const visitOtherProfile = () => {
    console.log(`visit  /profile/${follow._id}`);
    navigate(`/profile/${follow._id}`);
  };

  const [isFollow_, setIsFollow] = useState(isFollow);
  // console.log("isFollow_: ", isFollow_);
  const handleFollowWithStateChange = () => {
    if (!isLogin) {
      setShow(!show);
      return;
    }
    handleFollow(follow._id);
    setIsFollow(!isFollow_);
  };
  return (
    <div className={`mt-2 row p-3`}>
      <div
        className={`${
          isSelf ? `col-2` : `col-3 ms-3`
        } d-flex align-items-center`}
      >
        <img
          src={follow.img}
          width={`70px`}
          className={`rounded-pill`}
          onClick={() => visitOtherProfile()}
        />
      </div>
      <div
        className={`${
          isSelf ? `col-5` : `col`
        } ms-3 ps-3 d-flex align-items-center`}
      >
        <div>
          <div className={`fw-bold text-white`}>{follow.userName}</div>
          <div className={`text-muted`}>{follow.playlistsCount} playlists</div>
        </div>
      </div>
      <div className={`col d-flex align-items-center justify-content-end`}>
        {isSelf || isFollow_ ? (
          <button
            className={`btn btn-danger fw-bold`}
            onClick={() => handleFollowWithStateChange()}
          >
            Unfollow
          </button>
        ) : (
          <>
            <button
              ref={target}
              className={`btn btn-primary fw-bold`}
              onClick={() => handleFollowWithStateChange()}
            >
              Follow
            </button>
            <Overlay target={target.current} show={show} placement="left">
              {(props) => (
                <Tooltip
                  // id="overlay-example"
                  {...props}
                  className={`toolkit-like`}
                >
                  <div className={`w-100 d-block`}>
                    <h5 className={`text-nowrap`}>Explore your friends!</h5>
                    <p className={`toolkit-like-text mb-2 float-start`}>
                      <a
                        href={`/login`}
                        className={`toolkit-like-text text-warning`}
                      >
                        Login
                      </a>{" "}
                      to follow
                    </p>
                  </div>

                  <div className={` toolkit-like-text mt-3 mb-1`}>
                    <button
                      className={`btn btn-secondary p-1`}
                      onClick={() => setShow(false)}
                    >
                      Not Now
                    </button>
                  </div>
                </Tooltip>
              )}
            </Overlay>
          </>
        )}
        <></>
      </div>
    </div>
  );
};

export default FollowItem;
