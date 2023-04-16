import React, { useState } from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiVipDiamondFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Payment from "./Payment";
const PlanSelection = ({ setPlan, setPayment, setShow, setNumber }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser: ", currentUser);
  //   const [show, setShow] = useState();
  //   const [number, setNumber] = useState(null);
  const handleSelect = (id) => {
    setPlan(true);
    setShow(true);
    if (id === 0) {
      setNumber(8.9);
    } else if (id === 1) {
      setNumber(3 * 6.9);
    } else {
      setNumber(12 * 4.5);
    }
  };
  return (
    <div
      className={`premuim-plan-div d-flex align-items-center justify-content-center row p-0 m-0 mt-3 rounded-5`}
    >
      <div
        className={`premium-plan-card col-xxl-10 col-xl-12 col-lg-12 rounded-5`}
      >
        {currentUser && (
          <div>
            <div
              className={`d-flex justify-content-center mt-3 align-items-center`}
            >
              <h3 className={`text-white fw-bold`}>Choose your plan</h3>
            </div>
            <div
              className={`row mt-5 d-flex align-items-center justify-content-center plan-hint`}
            >
              {/* <div className={`col d-none d-xl-block`}></div> */}
              <div
                className={`col p-0 text-warning ms-2 fw-bold d-none d-xl-block`}
              >
                {/* Most popular{" "} */}
              </div>
              <div
                className={`col-xxl-2 col-xl-3 col-lg-3 col-3 col p-0 d-flex align-items-center justify-content-center  fw-bold`}
              >
                Monthly
              </div>
              <div
                className={`col-4 col-md-5 col-sm-5 p-0 d-flex align-items-center justify-content-center`}
              >
                <h4 className={`mb-0 d-flex`}>$ 8.90 </h4> / month
              </div>
              <div
                className={`col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-4 col-3 p-0 d-flex align-items-center justify-content-center`}
              >
                <button
                  className={`select-btn text-white fw-bold`}
                  onClick={() => handleSelect(0)}
                >
                  Select
                </button>
              </div>
            </div>
            <div
              className={`row mt-5 d-flex align-items-center justify-content-center plan-hint`}
            >
              <div
                className={`col p-0 text-warning ms-2 fw-bold d-none d-xl-block`}
              >
                Most popular{" "}
              </div>
              <div
                className={`col-xxl-2 col-xl-2 col-lg-3 col-3 col p-0 d-flex align-items-center justify-content-center  fw-bold`}
              >
                Quarterly
              </div>
              <div
                className={`col-4 col-md-5 col-sm-5 p-0 d-flex align-items-center justify-content-center`}
              >
                <h4 className={`mb-0 d-flex`}>$ 6.9 </h4> / month
              </div>
              <div
                className={`col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-4 col-3 p-0 d-flex align-items-center justify-content-center`}
              >
                <button
                  className={`select-btn text-white fw-bold`}
                  onClick={() => handleSelect(1)}
                >
                  Select
                </button>
              </div>
            </div>
            <div
              className={`row mt-5 d-flex align-items-center justify-content-center plan-hint`}
            >
              <div
                className={`col p-0 text-warning plan-hint ms-2 fw-bold d-none d-xl-block`}
              >
                Best value{" "}
              </div>
              <div
                className={`col-xxl-2 col-xl-2 col-lg-3 col-3 p-0 d-flex align-items-center justify-content-center fw-bold`}
              >
                Annual
              </div>
              <div
                className={`col-4 col-md-5 col-sm-5 p-0 d-flex align-items-center justify-content-center`}
              >
                <h4 className={`mb-0 d-flex`}>$ 4.5 </h4> / month
              </div>
              <div
                className={`col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-4 col-3 p-0 d-flex align-items-center justify-content-center`}
              >
                <button
                  className={`select-btn text-white fw-bold`}
                  onClick={() => handleSelect(2)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanSelection;
