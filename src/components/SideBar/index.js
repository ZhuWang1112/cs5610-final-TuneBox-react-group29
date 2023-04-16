import React, { useState, useEffect } from "react";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { SiMusicbrainz } from "react-icons/si";
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

  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(loginUser ? true : false);
  }, [loginUser]);

  return (
    <ul className={"list-unstyled wd-navbar sidebar-bg mb-0"}>
      <div className={`d-none d-xxl-block`}>
        <div className={`d-flex justify-content-center`}>
          <h2 className={`text-white mt-5 fw-bold`}>TuneBox</h2>
        </div>
      </div>
      <div
        className={`d-flex justify-content-center align-items-center d-block d-xxl-none`}
      >
        <SiMusicbrainz size={30} className={`text-white mt-3`} />
      </div>
      <Link
        to="/home"
        className={`list-group-item d-flex align-items-center justify-content-center text-muted fw-bold mt-5`}
      >
        <div className={`row d-flex align-items-center`}>
          <div className={`col p-0`}>
            <AiOutlineHome
              className={`float-end p-0`}
              size={25}
              height={`50px`}
            />
          </div>
          <div className={`col-8 d-none d-xxl-block`}>
            <span className={`navbar-text`}>Home</span>
          </div>
        </div>
      </Link>
      <Link
        to="/search"
        className={`list-group-item d-flex align-items-center justify-content-center text-muted fw-bold mt-3`}
      >
        <div className={`row d-flex align-items-center`}>
          <div className={`col p-0`}>
            <AiOutlineSearch className={`float-end p-0`} size={25} />
          </div>
          <div className={`col-8 d-none d-xxl-block`}>
            <span className={`navbar-text`}>Search</span>
          </div>
        </div>
      </Link>

      <div
        className={`list-group-item d-flex align-items-center justify-content-center text-muted fw-bold mt-3`}
        onClick={() => navigate(`/profile`)}
      >
        <div className={`row d-flex align-items-center`}>
          <div className={`col p-0`}>
            <FaRegUser className={`float-end p-0`} size={25} />
          </div>
          <div className={`col-8 d-none d-xxl-block`}>
            <span className={`navbar-text`}>Profile</span>
          </div>
        </div>
      </div>
      {login && loginUser && loginUser.isAdmin && (
        <Link
          to="/admin/dashboard"
          className={`list-group-item d-flex align-items-center justify-content-center text-muted fw-bold mt-3`}
        >
          <div className={`row d-flex align-items-center`}>
            <div className={`col p-0`}>
              <MdOutlineAdminPanelSettings
                className={`float-end p-0`}
                size={25}
              />
            </div>
            <div className={`col-8 d-none d-xxl-block`}>
              <span className={`navbar-text`}>Admin</span>
            </div>
          </div>
        </Link>
      )}
    </ul>
  );
};

export default SideBar;
