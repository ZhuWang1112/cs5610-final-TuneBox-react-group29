import React, { useState } from "react";
import "./index.css";
import { FiUser } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import PremiumFunction from "./PremiumFunction";
import PlanSelection from "./PlanSelection";
const PremiumDetails = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [account, setAccount] = useState(false);
  const [plan, setPlan] = useState(false);
  const [payment, setPayment] = useState(false);
  return (
    <div>
      <div className={`premium-banner row`}>
        <div className={`col-3`}></div>
        <div className={`col row w-100 d-flex align-items-center`}>
          <div className={`col`}>
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
          <div className={`col`}>
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
          <div className={`col`}>
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
        <div className={`col-3`}></div>
      </div>
      <div className={`row`}>
        <div className={`col p-0`}>
          <PremiumFunction />
        </div>
        <div className={`col-7 p-0`}>
          <PlanSelection setPlan={setPlan} setPayment={setPayment} />
        </div>
      </div>
    </div>
  );
};

export default PremiumDetails;
