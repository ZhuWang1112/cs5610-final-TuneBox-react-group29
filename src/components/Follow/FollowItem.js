import React, { useState, useRef } from "react";
import "./index.css";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { MdRemoveCircle, MdAddCircle } from "react-icons/md";
import Overlay from "react-bootstrap/Overlay";
const FollowItem = ({ follow, isFollow, handleFollow, isSelf, isLogin }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showName, setShowName] = useState(false);
  const target = useRef(null);
  const visitOtherProfile = () => {
    console.log(`visit  /profile/${follow._id}`);
    navigate(`/profile/${follow._id}`);
  };


  const [isFollow_, setIsFollow] = useState(isFollow);
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
        className={`col-lg-7 col-xl-2 col-2 ms-3 d-flex align-items-center justify-content-center position-relative`}
      >
        <img
          src={follow.img}
          width={`70px`}
          height={`70px`}
          className={`rounded-pill`}
          onClick={() => visitOtherProfile()}
          onMouseOver={() => setShowName(true)}
          onMouseOut={() => setShowName(false)}
        />
        {showName && (
          <div className={`position-absolute name-hint`}>{follow.userName}</div>
        )}
      </div>
      <div
        className={`col-4 ms-3 ps-3 d-none d-xl-flex d-flex align-items-center`}
      >
        <div className={``}>
          <div className={`fw-bold text-white`}>{follow.userName}</div>
          <div className={`text-muted`}>{follow.playlistsCount} playlists</div>
        </div>
      </div>
      <div className={`col d-flex align-items-center justify-content-end`}>
        {isLogin && (isSelf || isFollow_) ? (
          <>
            <button
              className={`btn btn-danger fw-bold d-none d-xl-block`}
              onClick={() => handleFollowWithStateChange()}
            >
              Unfollow
            </button>
            <MdRemoveCircle
              size={30}
              className={`text-danger d-block d-xl-none`}
              onClick={() => handleFollowWithStateChange()}
            />
          </>
        ) : (
          <div className={`position-relative`}>
            <button
              className={`btn btn-primary fw-bold  d-none d-xl-block`}
              onClick={() => handleFollowWithStateChange()}
            >
              Follow
            </button>
            <MdAddCircle
              size={30}
              className={`text-primary d-block d-xl-none`}
              onClick={() => handleFollowWithStateChange()}
            />
            {show && (
              <div className={`toolkit-div position-absolute rounded-3`}>
                <h5 className={`text-white fw-bold m-2`}>Explore friends!</h5>
                <div
                  className={`mt-3 mb-1 d-flex justify-content-center align-items-center`}
                >
                  <button
                    className={`btn btn-light p-1`}
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </button>
                  <p
                    className={`text-muted mb-0 ms-3 not-now`}
                    onClick={() => setShow(false)}
                  >
                    Not Now
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        <></>
      </div>
    </div>
  );
};

export default FollowItem;
