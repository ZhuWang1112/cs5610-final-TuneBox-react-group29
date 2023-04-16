import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserNonAdminThunk } from "../../services/users/users-thunks";
const Unsubsribe = ({ setPlan, setPayment }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const handleUnsubscribe = () => {
    setPlan(false);
    setPayment(false);
    dispatch(updateUserNonAdminThunk({ ...currentUser, isVip: false }));
  };
  return (
    <div
      className={`unsubscribe-div d-flex align-items-center justify-content-center row p-0 m-0 mt-3 rounded-5`}
    >
      <div className={`col col-lg-11 col-xl-9 col-xxl-8`}>
        <h1>Pro</h1>
        <p>Unlimited playlist and songs numbers </p>
        <p>Latest recommendation for albums and artists</p>
        <button
          className={`btn btn-light fw-bold mt-5`}
          onClick={() => handleUnsubscribe()}
        >
          CANCEL SUBSCRIPTION
        </button>
      </div>
    </div>
  );
};

export default Unsubsribe;
