import React, { useState } from "react";
import "./index.css";
import Card from "react-bootstrap/Card";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiVipDiamondFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Payment from "./Payment";
const PlanSelection = ({ setPlan, setPayment }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [show, setShow] = useState();
  const [number, setNumber] = useState(null);
  const [welcome, setWelcome] = useState(true);
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
      className={`premium-function-div d-flex align-items-center justify-content-center row p-0 m-0 mt-5`}
    >
      <div className={`premium-function-card col-10 rounded-5`}>
        {!currentUser && (
          <div>
            <div
              className={`d-flex justify-content-center mt-3 align-items-center row w-100`}
            >
              <h3 classname={`text-white fw-bold`}>
                Please login to choose your plan
              </h3>
            </div>
            <div
              className={`premium-function-text mt-3 text-muted d-flex justify-content-center`}
            >
              <button
                className={`btn btn-light fw-bold`}
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className={`btn text-muted`}
                onClick={() => navigate("/home")}
              >
                Browse more
              </button>
            </div>
          </div>
        )}
        {currentUser && (
          <div>
            <div
              className={`d-flex justify-content-center mt-3 align-items-center`}
            >
              <h3 classname={`text-white fw-bold`}>Choose your plan</h3>
            </div>
            <div
              className={`row mt-5 d-flex align-items-center justify-content-center plan-hint`}
            >
              <div className={`col`}></div>
              <div
                className={`col-3 p-0s d-flex align-items-center justify-content-center`}
              >
                Monthly
              </div>
              <div
                className={`col-4 p-0 d-flex align-items-center justify-content-center`}
              >
                <h4 className={`mb-0 d-flex`}>$ 8.90 </h4> / month
              </div>
              <div
                className={`col-3 p-0 d-flex align-items-center justify-content-center`}
              >
                <button
                  className={`btn btn-primary text-white fw-bold`}
                  onClick={() => handleSelect(0)}
                >
                  Select
                </button>
              </div>
            </div>
            <div
              className={`row mt-5 d-flex align-items-center justify-content-center plan-hint`}
            >
              <div className={`col p-0 text-warning`}>Most popular </div>
              <div
                className={`col-3  p-0 d-flex align-items-center justify-content-center`}
              >
                Quarterly
              </div>
              <div
                className={`col-4 p-0 d-flex align-items-center justify-content-center`}
              >
                <h4 className={`mb-0 d-flex`}>$ 6.90 </h4> / month
              </div>
              <div
                className={`col-3 p-0 d-flex align-items-center justify-content-center`}
              >
                <button
                  className={`btn btn-primary text-white fw-bold`}
                  onClick={() => handleSelect(1)}
                >
                  Select
                </button>
              </div>
            </div>
            <div
              className={`row mt-5 d-flex align-items-center justify-content-center plan-hint`}
            >
              <div className={`col p-0 text-warning plan-hint`}>
                Best value{" "}
              </div>
              <div
                className={`col-3 p-0 d-flex align-items-center justify-content-center`}
              >
                Annual
              </div>
              <div
                className={`col-4 p-0 d-flex align-items-center justify-content-center`}
              >
                <h4 className={`mb-0 d-flex`}>$ 4.50 </h4> / month
              </div>
              <div
                className={`col-3 p-0 d-flex align-items-center justify-content-center`}
              >
                <button
                  className={`btn btn-primary text-white fw-bold`}
                  onClick={() => handleSelect(2)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        )}
        {currentUser && show && (
          <Payment
            number={number}
            setShow={setShow}
            setPlan={setPlan}
            setWelcome={setWelcome}
            setPayment={setPayment}
          />
        )}
        {currentUser && welcome && (
          <div
            className={`row w-100 mt-5 d-flex align-items-center justify-content-center text-warning welcome-div`}
          >
            <h3>Enjoy your preimum journey!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanSelection;
