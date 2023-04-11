import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { loginThunk, logoutThunk } from "../../services/users/users-thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
const NavBar = () => {
  console.log("NavBar rerender");
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("loginUser in navBar", loginUser);
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
      <Link to="/premium" className={`text-warning pt-2 navbar-text mx-3`}>
        <span>Premium</span>
      </Link>

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
        <Link to="/login" className={`text-muted pt-2 navbar-text mx-3`}>
          <span
            onClick={() => {
              dispatch(logoutThunk());
              // navigate("/login");
            }}
          >
            Logout
          </span>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
