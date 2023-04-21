import {useDispatch, useSelector} from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import HomeCard from "../../components/HomeCard";
import React, {useEffect, useState} from "react";
import {hotArtistThunk} from "../../services/thunks/hot-thunk";
import { findCurrentUserThunk } from "../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../services/thunks/like-thunk.js";

const AllHotArtist = () => {
  const { artists } = useSelector((state) => state.hot);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Call useHistory hook

  useEffect(() => {
    if (artists.length === 0) {
      dispatch(hotArtistThunk());
    }
  }, []);
  const handleBackClick = () => {
    navigate(-1); // Navigate back on arrow click
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let num = Math.floor(windowWidth / 250);
  useEffect(() => {
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
  }, []);

  return (
    <div className={"m-2"}>
      <div
        className={"text-white"}
        style={{ display: "flex", alignItems: "center" }}
      >
        <ArrowBackIcon onClick={handleBackClick} />
        <h2 className={"ms-2"} style={{ color: "gold" }}>
          Top Artists
        </h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {artists.map((artist) => (
          <div
            key={artist.rank}
            style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
          >
            <HomeCard item={artist} type={"artist"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllHotArtist;
