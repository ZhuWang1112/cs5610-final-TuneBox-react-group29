import React, { useState } from "react";
import "./index.css";
import { FiUser } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import PremiumFunction from "./PremiumFunction";
import PlanSelection from "./PlanSelection";
import Unsubscribe from "./Unsubsribe.js";
import { useNavigate } from "react-router";
import Payment from "./Payment";
const PremiumDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [account, setAccount] = useState(false);
  const [plan, setPlan] = useState(currentUser && currentUser.isVip);
  const [payment, setPayment] = useState(currentUser && currentUser.isVip);
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState(null);
  return (
    <div>
      <div className={`premium-banner row`}>
        <div className={`d-none d-lg-block col-lg-2 col-3`}></div>
        <div className={`col row w-100 d-flex align-items-center`}>
          <div className={`col p-0`}>
            <div
              className={`mb-3 mt-3 d-flex align-items-center justify-content-center`}
            >
              <p
                className={`premium-banner-text mb-0 ${
                  currentUser ? `text-success` : `text-white`
                }`}
              >
                Account
              </p>
            </div>
            <div className={`d-flex align-items-center justify-content-center`}>
              <FiUser
                size={60}
                className={`${currentUser ? `text-success` : `text-white`}`}
              />
            </div>
          </div>
          <div className={`col-4 p-0`}>
            <div
              className={`mb-3 mt-3 d-flex align-items-center justify-content-center`}
            >
              <p
                className={`premium-banner-text mb-0 ${
                  plan ? `text-success` : `text-white`
                }`}
              >
                Plan Selection
              </p>
            </div>
            <div className={`d-flex align-items-center justify-content-center`}>
              <BsFillFileEarmarkRuledFill
                size={60}
                className={` ${plan ? `text-success` : `text-white`}`}
              />
            </div>
          </div>
          <div className={`col p-0`}>
            <div
              className={`mb-3 mt-3 d-flex align-items-center justify-content-center`}
            >
              <p
                className={`premium-banner-text mb-0 ${
                  payment ? `text-success` : `text-white`
                }`}
              >
                Payment
              </p>
            </div>
            <div className={`d-flex align-items-center justify-content-center`}>
              <MdPayment
                size={60}
                className={`${payment ? `text-success` : `text-white`}`}
              />
            </div>
          </div>
        </div>
        <div className={`d-none d-lg-block col-3`}></div>
      </div>
      <div className={`d-flex justify-content-center`}>
        <div className={`row premum-bg rounded-5 m-0`}>
          <div className={`col p-0 d-none d-md-block`}>
            <PremiumFunction />
          </div>
          <div
            className={`col-xxl-7 col-xl-6 p-0 col-lg-6 col-md-7 col-sm-10 col-10`}
          >
            {currentUser && !currentUser.isVip && (
              <PlanSelection
                setPlan={setPlan}
                setPayment={setPayment}
                setShow={setShow}
                setNumber={setNumber}
              />
            )}
            {currentUser && currentUser.isVip && (
              <Unsubscribe setPlan={setPlan} setPayment={setPayment} />
            )}
            {!currentUser && (
              <div
                className={`login-hint-div d-flex align-items-center justify-content-center row p-0 m-0 mt-5`}
              >
                <div
                  className={`d-flex justify-content-center mt-3 align-items-center col`}
                >
                  <h3 className={`text-white fw-bold`}>
                    Please login to choose your plan
                  </h3>
                </div>
                <div className={`text-muted d-flex justify-content-center`}>
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
          </div>
        </div>
      </div>
      <div className={`d-flex justify-content-center`}>
        <div className={`row premum-bg rounded-5 m-0`}>
          <div className={`col p-0 d-none d-md-block`}></div>
          <div
            className={`col-xxl-7 col-xl-6 p-0 col-lg-6 col-md-7 col-sm-10 col-10`}
          >
            {currentUser && show && (
              <Payment
                number={number}
                setShow={setShow}
                setPlan={setPlan}
                // setWelcome={setWelcome}
                setPayment={setPayment}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumDetails;
