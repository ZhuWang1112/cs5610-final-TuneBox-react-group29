import React from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiVipDiamondFill } from "react-icons/ri";
const PremiumFunction = () => {
  return (
    <div
      className={`premium-function-div d-flex align-items-center justify-content-center row p-0 m-0 mt-3 rounded-5`}
    >
      <div
        className={`premium-function-card col-xxl-10 col-xl-10 col-lg-12 rounded-5 p-0`}
      >
        <div
          className={`d-flex justify-content-start mt-3 align-items-center row m-3`}
        >
          <div
            className={`col-2 d-none d-lg-block d-flex justify-content-center text-warning p-0`}
          >
            <RiVipDiamondFill size={30} />
          </div>
          <div className={`col p-0 d-none d-lg-block`}>
            <h3 className={`text-white fw-bold`}>Upgrade to premium</h3>
          </div>
          <div className={`col p-0 d-md-block d-lg-none  ms-3`}>
            <h3 className={`text-white fw-bold`}>Upgrade</h3>
          </div>
        </div>
        <div
          className={`premium-function-text mt-3 text-warning d-none d-lg-block ms-3`}
        >
          <h5 className={`mb-0`}>You can get a lot more out of it.</h5>
          <h5>Upgrading to premium. Get all features:</h5>
        </div>
        <div className={`d-flex justify-content-center d-none d-lg-block`}>
          <div
            className="premium-function-item mt-3"
            //   onClick={handleClick}
          >
            <div className={"mt-3 mb-3 d-flex align-items-center ms-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>
                No limitation on Playlist numbers
              </h5>
            </div>
            <div className={"d-flex align-items-center mt-3 mb-3 ms-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>No limitation on Song numbers</h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3 ms-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>
                Make your comments more distinct
              </h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3 ms-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>Recommendation of top artists</h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3 ms-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>Recommendation of top albums</h5>
            </div>
          </div>
        </div>

        <div className={`d-flex justify-content-center d-md-block d-lg-none`}>
          <div
            className="premium-function-item mt-3"
            //   onClick={handleClick}
          >
            <div className={"mt-3 mb-3 d-flex align-items-center ms-3"}>
              <AiFillCheckCircle
                size={30}
                className={`text-success d-none d-md-block`}
              />
              <h5 className={`p-0 m-0 ms-2`}>Limitless Playlists</h5>
            </div>
            <div className={"d-flex align-items-center mt-3 mb-3 ms-3"}>
              <AiFillCheckCircle
                size={30}
                className={`text-success  d-none d-md-block`}
              />
              <h5 className={`p-0 m-0 ms-2`}>Limitless Songs</h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3 ms-3"}>
              <AiFillCheckCircle
                size={30}
                className={`text-success d-none d-md-block`}
              />
              <h5 className={`p-0 m-0 ms-2`}>Distinct comments</h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3 ms-3"}>
              <AiFillCheckCircle
                size={30}
                className={`text-success d-none d-md-block`}
              />
              <h5 className={`p-0 m-0 ms-2`}>Top artists</h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3 ms-3"}>
              <AiFillCheckCircle
                size={30}
                className={`text-success d-none d-md-block`}
              />
              <h5 className={`p-0 m-0 ms-2`}>Top albums</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFunction;
