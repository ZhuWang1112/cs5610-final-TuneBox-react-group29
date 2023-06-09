import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { logoutThunk } from "../../services/users/users-thunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
const NavBar = () => {
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const { currentUser } = useSelector((state) => state.user);
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(loginUser ? true : false);
  }, [loginUser]);

  return (
    <div
      className={
        "navbar-bg me-0 d-flex justify-content-end align-items-center pe-5"
      }
    >
      {(!login || (login && currentUser && !currentUser.isVip)) && (
        <Link to="/premium" className={`text-warning pt-2 navbar-text mx-3`}>
          <span>Premium</span>
        </Link>
      )}

      {login && currentUser && currentUser.isVip && (
        <Link to="/premium" className={`text-warning pt-2 navbar-text mx-3`}>
          <span>Unsubscribe</span>
        </Link>
      )}

      <div className={`text-white`}>|</div>

      {!login && (
        <>
          <Link
            to="/register"
            className={`text-muted pt-2 navbar-text pe-2 ms-2`}
          >
            <span>Register</span>
          </Link>
          <Link to="/login" className={`text-muted pt-2 navbar-text mx-3`}>
            <span>Login</span>
          </Link>
        </>
      )}
      {login && (
        <>
          {currentUser && (
            <h5 className={`m-0 text-warning ms-3 welcome-cell text-nowrap`}>
              Hi {currentUser.userName}
            </h5>
          )}

          <Link to="/login" className={`text-muted pt-2 navbar-text mx-3`}>
            <span
              onClick={() => {
                dispatch(logoutThunk());
                navigate("/login");
              }}
            >
              Logout
            </span>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
