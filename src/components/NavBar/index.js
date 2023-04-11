import React from 'react'
import {Link} from "react-router-dom";
import './index.css';
import { logoutThunk } from "../../services/users/users-thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
const NavBar = () => {
  let loginUser = localStorage.getItem("currentUser");
  if (loginUser) {
    loginUser = JSON.parse(loginUser);
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

      {!loginUser && (
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
      {loginUser && (
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
      )}
    </div>
  );
};

export default NavBar