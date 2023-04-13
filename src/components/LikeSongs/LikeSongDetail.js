import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import HomeCard from "../../components/HomeCard";
import React, { useEffect, useState } from "react";
import { findLikedSongs } from "../../services/like-service";
// import LikeSongItem from "./LikeSongItem";

const LikeSongDetail = () => {
  const { uid } = useParams();
  const [songs, setSongs] = useState(null);
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate back on arrow click
  };
  const findSongs = async (id) => {
    const data = await findLikedSongs(id);
    setSongs(data);
  };
  useEffect(() => {
    findSongs(uid ? uid : loginUser._id);
  }, [uid]);

  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ];
  return (
    <div className={"m-2"}>
      <div
        className={"text-white"}
        style={{ display: "flex", alignItems: "center" }}
      >
        <ArrowBackIcon onClick={handleBackClick} />
        <h2 className={"ms-2"} style={{ color: "gold" }}>
          My Favirote Songs
        </h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {songs &&
          data.map((song) => (
            <div
              key={song.id}
              style={{ flex: "1 0 16.666%", maxWidth: "16.666%" }}
            >
              <HomeCard item={song} type={"song"} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default LikeSongDetail;
