import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import {
  MdOutlineAdminPanelSettings,
  MdWorkspacePremium,
} from "react-icons/md";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { useNavigate } from "react-router";

const SideBar = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const active = paths[2] === "" || paths[2] === undefined ? "home" : paths[2];
  // const [userId, setUserId] = useState(null);
  // let loginUser = localStorage.getItem("currentUser");
  // if (loginUser) {
  //   loginUser = JSON.parse(loginUser);
  //   setUserId(loginUser._id);
  // }
  // console.log("userId", userId);
  // useEffect(() => {
  //   if (localStorage.getItem("currentUser") !== null) {
  //     console.log("login");
  //     setUserId(JSON.parse(localStorage.getItem("currentUser"))._id);
  //   } else {
  //     console.log("no login");
  //   }
  // }, [localStorage.getItem("currentUser")]);
  const navigate = useNavigate();
  const handleProfile = () => {
    localStorage.getItem("currentUser") === null
      ? navigate(`profile/default`)
      : navigate(
          `profile/${JSON.parse(localStorage.getItem("currentUser"))._id}`
        );
  };

  return (
    <ul className={"list-unstyled wd-navbar sidebar-bg mb-0"}>
      <div className={`d-flex justify-content-center`}>
        <h2 className={`text-white mt-5 fw-bold`}>TuneBox</h2>
      </div>
      <Link
        to="/home"
        className={`list-group-item d-flex align-items-center justify-content-center text-muted fw-bold mt-5`}
      >
        <div className={`row d-flex align-items-center`}>
          <div className={`col-3`}>
            <AiOutlineHome
              className={`float-end p-0`}
              size={25}
              height={`50px`}
            />
          </div>
          <div className={`col`}>
            <span className={`navbar-text`}>Home</span>
          </div>
        </div>
      </Link>
      <Link
        to="/search"
        className={`list-group-item d-flex align-items-center justify-content-center text-muted fw-bold mt-3`}
      >
        <div className={`row d-flex align-items-center`}>
          <div className={`col-3`}>
            <AiOutlineSearch className={`float-end p-0`} size={25} />
          </div>
          <div className={`col`}>
            <span className={`navbar-text`}>Search</span>
          </div>
        </div>
      </Link>

      <div
        className={`list-group-item d-flex align-items-center justify-content-center text-muted fw-bold mt-3`}
        onClick={() => handleProfile()}
      >
        <div className={`row d-flex align-items-center`}>
          <div className={`col-3`}>
            <FaRegUser className={`float-end p-0`} size={25} />
          </div>
          <div className={`col`}>
            <span className={`navbar-text`}>Profile</span>
          </div>
        </div>
      </div>
      <Link
        to="/admin/dashboard"
        className={`list-group-item d-flex align-items-center justify-content-center text-muted fw-bold mt-3`}
      >
        <div className={`row d-flex align-items-center`}>
          <div className={`col-3`}>
            <MdOutlineAdminPanelSettings
              className={`float-end p-0`}
              size={25}
            />
          </div>
          <div className={`col`}>
            <span className={`navbar-text`}>Admin</span>
          </div>
        </div>
      </Link>
    </ul>
  );
};

export default SideBar;
