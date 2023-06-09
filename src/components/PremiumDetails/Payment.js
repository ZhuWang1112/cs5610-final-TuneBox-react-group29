import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { updateUserNonAdminThunk } from "../../services/users/users-thunks";
import {
  RiSecurePaymentFill,
  RiMoneyPoundCircleFill,
  RiMoneyDollarCircleFill,
  RiMoneyCnyCircleFill,
} from "react-icons/ri";

const Payment = ({ number, setShow, setPlan, setPayment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleCheckout = () => {
    setShow(false);
    setPayment(true);
    dispatch(updateUserNonAdminThunk({ ...currentUser, isVip: true }));
  };

  return (
    <div
      className={`payment-div d-flex align-items-center justify-content-center row p-0 m-0 rounded-5`}
    >
      <div className={`col-10 rounded-5`}>
        <div>
          <div
            className={`d-flex justify-content-center mt-3 align-items-center`}
          >
            <h3 className={`text-white fw-bold`}>Your Billing information</h3>
          </div>
          <div
            className={`row mt-5 d-flex align-items-center justify-content-center`}
          >
            <div
              className={`col d-none d-lg-block p-0 d-flex align-items-center`}
            >
              <RiSecurePaymentFill size={50} className={`ms-1 text-success`} />
              <RiMoneyPoundCircleFill
                size={50}
                className={`ms-1 text-danger`}
              />
              <RiMoneyDollarCircleFill
                size={50}
                className={`ms-1 text-primary`}
              />
              <RiMoneyCnyCircleFill size={50} className={`ms-1 text-muted`} />
            </div>
            <div
              className={`col col-lg-4 col-xl-4 col-xxl-4 p-0 d-flex align-items-center justify-content-center`}
            >
              <h4 className={`fw-bold text-danger plan-hint-total mb-0`}>
                Total
              </h4>
              <h4 className={`mb-0 d-flex ms-3`}>
                $ {Math.round(number * 100) / 100}
              </h4>
            </div>
          </div>
          <button
            className={`btn btn-danger mt-5 float-end fw-bold ms-3 mb-5`}
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
          <button
            className={`btn btn-light mt-5 float-end fw-bold mb-5`}
            onClick={() => {
              setShow(false);
              setPlan(false);
            }}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
