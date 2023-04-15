import React from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiVipDiamondFill } from "react-icons/ri";
const PremiumFunction = () => {
  return (
    <div
      className={`premium-function-div d-flex align-items-center justify-content-center row p-0 m-0 mt-5`}
    >
      <div className={`premium-function-card col-8 rounded-5`}>
        <div
          className={`d-flex justify-content-center mt-3 align-items-center row w-100`}
        >
          <div className={`col-2 d-flex justify-content-center text-warning`}>
            <RiVipDiamondFill size={30} />
          </div>
          <div className={`col`}>
            <h3 classname={`text-white fw-bold`}>Upgrade to premium</h3>
          </div>
        </div>
        <div className={`premium-function-text mt-3 text-muted`}>
          <p className={`mb-0`}>You can get a lot more out of it.</p>
          <p>Upgrading to premium. Get all features:</p>
        </div>
        <div className={`d-flex justify-content-center`}>
          <div
            className="premium-function-item mt-5"
            //   onClick={handleClick}
          >
            <Card.Body>
              <Card.Text>
                <div className={"d-flex align-items-center"}>
                  <AiFillCheckCircle size={30} className={`text-success`} />{" "}
                  <h5 className={`p-0 m-0 ms-2`}>
                    No limitation on Playlist numbers
                  </h5>
                </div>
              </Card.Text>
              <Card.Text>
                <div className={"d-flex align-items-center"}>
                  <AiFillCheckCircle size={30} className={`text-success`} />{" "}
                  <h5 className={`p-0 m-0 ms-2`}>
                    No limitation on Favorite song numbers
                  </h5>
                </div>
              </Card.Text>
              <Card.Text>
                <div className={"d-flex align-items-center"}>
                  <AiFillCheckCircle size={30} className={`text-success`} />{" "}
                  <h5 className={`p-0 m-0 ms-2`}>
                    Make your comments more distinct
                  </h5>
                </div>
              </Card.Text>
              <Card.Text>
                <div className={"d-flex align-items-center"}>
                  <AiFillCheckCircle size={30} className={`text-success`} />{" "}
                  <h5 className={`p-0 m-0 ms-2`}>
                    Recommendation of top artists
                  </h5>
                </div>
              </Card.Text>
              <Card.Text>
                <div className={"d-flex align-items-center"}>
                  <AiFillCheckCircle size={30} className={`text-success`} />{" "}
                  <h5 className={`p-0 m-0 ms-2`}>
                    Recommendation of top albums
                  </h5>
                </div>
              </Card.Text>
            </Card.Body>
          </div>
        </div>

        {/* <div className={`d-flex justify-items-center bg-primary`}>
          <div className={`premium-function-item text-dark`}>
            <h5>No limitation on Playlist numbers</h5>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PremiumFunction;
