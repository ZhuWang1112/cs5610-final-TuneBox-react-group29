import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import HomeCard from "../../components/HomeCard";
import React, { useEffect, useState } from "react";
import { findLikedSongsByUser } from "../../services/songPlaylist-service";
import { findCurrentUserThunk } from "../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../services/thunks/like-thunk";
// import LikeSongItem from "./LikeSongItem";

const LikeSongDetail = () => {
  const { uid } = useParams();
  const [songs, setSongs] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { likedSongs } = useSelector((state) => state.likedSong);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate back on arrow click
  };
  const findSongs = async (id) => {
    // const data = await findLikedSongs(id);
    const data = await findLikedSongsByUser(id);
    setSongs(data);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // fetch current login user
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
    findSongs(uid ? uid : currentUser._id);
  }, [uid]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let num = Math.floor(windowWidth / 250);

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
        {!currentUser || currentUser._id !== uid
          ? songs &&
            songs.map((song) => (
              <div
                key={song.id}
                style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
              >
                <HomeCard item={song.songId} type={"song"} />
              </div>
            ))
          : likedSongs &&
            likedSongs.map((song) => (
              <div
                key={song.id}
                style={{ flex: `1 0 ${100 / num}%`, maxWidth: `${100 / num}%` }}
              >
                <HomeCard item={song} type={"song"} />
              </div>
            ))}
      </div>
    </div>
  );
};
export default LikeSongDetail;
