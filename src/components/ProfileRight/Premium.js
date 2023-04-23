import React from "react";
import "./index.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Premium = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div
      className={`premium-bg row d-flex align-items-center ms-2 me-5 go-premium`}
    >
      <FaArrowCircleRight
        className={`col-2 ps-0 pe-0`}
        size={35}
        onClick={() => navigate("/premium")}
      />

      <div
        className={`d-flex justify-content-start col ps-0 pe-0 d-none d-xl-block`}
      >
        <img src={`/images/premium.jpeg`} className={`rotate-30`} />
      </div>
      <div
        className={`d-flex justify-content-start col ps-0 pe-0 d-block d-xl-none`}
      >
        <MdWorkspacePremium size={35} className={`ms-2 p-0 text-warning`} />
      </div>

      <div
        className={`d-flex justify-content-start align-items-center ms-0 text-warning  d-none d-xl-block`}
      >
        <h3 className={`mt-0 mb-0`}>
          {currentUser && currentUser.isVip
            ? `Change your Billing Plan`
            : `Go Premium`}
        </h3>
        <MdWorkspacePremium
          size={25}
          className={`ms-2 p-0 d-block d-xl-none`}
        />
      </div>
    </div>
  );
};

export default Premium;
