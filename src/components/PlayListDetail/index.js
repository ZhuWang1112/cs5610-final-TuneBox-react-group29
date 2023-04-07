import React from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import PlayListDetailItem from "./PlayListDetailItem";
import "./index.css";

const PlayListDetail = () => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  return (
    <div className={`mt-3 ms-3 me-3`}>
      <div className={`row`}>
        <div className={`col-4`}>
          <h5 className={`fw-fold text-white`}># TITLE</h5>
        </div>
        <div className={`col-2 text-muted ps-0`}>
          <BsFillPersonLinesFill size={30} />
        </div>
        <div className={`col-2 text-muted ps-0`}>
          <AiOutlineFieldTime size={30} />
        </div>
        <div className={`col-2`}></div>
        <div className={`col`}></div>
      </div>
      <div className={`song-container`}>
        {data.map(() => (
          <PlayListDetailItem />
        ))}
      </div>
    </div>
  );
};

export default PlayListDetail;
