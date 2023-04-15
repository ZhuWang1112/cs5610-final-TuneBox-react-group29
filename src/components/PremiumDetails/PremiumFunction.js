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
      <div className={`premium-function-card col-9 rounded-5`}>
        <div
          className={`d-flex justify-content-start mt-3 align-items-center row m-3`}
        >
          <div className={`col-2 d-flex justify-content-start text-warning`}>
            <RiVipDiamondFill size={30} />
          </div>
          <div className={`col`}>
            <h3 className={`text-white fw-bold`}>Upgrade to premium</h3>
          </div>
        </div>
        <div className={`premium-function-text mt-3 text-warning`}>
          <h5 className={`mb-0`}>You can get a lot more out of it.</h5>
          <h5>Upgrading to premium. Get all features:</h5>
        </div>
        <div className={`d-flex justify-content-center`}>
          <div
            className="premium-function-item mt-3"
            //   onClick={handleClick}
          >
            <div className={"d-flex align-items-center mt-3 mb-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>
                No limitation on Playlist numbers
              </h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>
                No limitation on Favorite song numbers
              </h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>
                Make your comments more distinct
              </h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>Recommendation of top artists</h5>
            </div>

            <div className={"d-flex align-items-center mt-3 mb-3"}>
              <AiFillCheckCircle size={30} className={`text-success`} />{" "}
              <h5 className={`p-0 m-0 ms-2`}>Recommendation of top albums</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFunction;
