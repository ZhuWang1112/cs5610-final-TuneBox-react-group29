import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import HomeCard from "../../components/HomeCard";
import React, { useEffect, useState } from "react";
import { findLikedSongs } from "../../services/like-service";
import { findLikedSongsByUser } from "../../services/songPlaylist-service";
// import LikeSongItem from "./LikeSongItem";

const LikeSongDetail = () => {
  const { uid } = useParams();
  const [songs, setSongs] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate back on arrow click
  };
  const findSongs = async (id) => {
    // const data = await findLikedSongs(id);
    const data = await findLikedSongsByUser(id);
    console.log("data in LikeSongDetail", data);
    setSongs(data);
  };
  useEffect(() => {
    findSongs(uid ? uid : currentUser._id);
  }, [uid]);

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
          songs.map((song) => (
            <div
              key={song.id}
              style={{ flex: "1 0 16.666%", maxWidth: "16.666%" }}
            >
              <HomeCard item={song.songId} type={"song"} />
            </div>
          ))}
      </div>
    </div>
  );
};
export default LikeSongDetail;
