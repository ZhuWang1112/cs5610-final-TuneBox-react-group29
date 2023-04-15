import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { updateUserNonAdminThunk } from "../../services/users/users-thunks";
const Payment = ({ number, setShow, setPlan, setWelcome, setPayment }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleCheckout = () => {
    setShow(false);
    setWelcome(true);
    setPayment(true);
    dispatch(updateUserNonAdminThunk({ ...currentUser, isVip: true }));
  };
  return (
    <div
      className={`premium-function-div d-flex align-items-center justify-content-center row p-0 m-0 mt-5`}
    >
      <div className={`premium-function-card col-10 rounded-5`}>
        <div>
          <div
            className={`d-flex justify-content-center mt-3 align-items-center`}
          >
            <h3 classname={`text-white fw-bold`}>Your Billing information</h3>
          </div>
          <div
            className={`row mt-5 d-flex align-items-center justify-content-center`}
          >
            <div
              className={`col-3 p-0 d-flex align-items-center justify-content-center fw-bold text-warning plan-hint-total`}
            >
              Total
            </div>
            <div
              className={`col-4 p-0 d-flex align-items-center justify-content-center`}
            >
              <h4 className={`mb-0 d-flex`}>
                $ {Math.round(number * 100) / 100}
              </h4>
            </div>
          </div>
          <button
            className={`btn btn-danger mt-5 float-end fw-bold ms-3`}
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
          <button
            className={`btn btn-light mt-5 float-end fw-bold`}
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
