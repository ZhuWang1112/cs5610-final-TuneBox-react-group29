import React, { useState, useEffect } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import PlayListDetailItem from "./PlayListDetailItem";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaylist } from "../../reducers/playlist-reducer.js";
import { updateLike } from "../../services/like-service.js";
import { updateLikeThunk } from "../../services/thunks/like-thunk.js";
import { findSongsThunk } from "../../services/thunks/playlist-thunk.js";
import "./index.css";

const PlayListDetail = ({ playlist }) => {
  console.log(playlist);
  const { songs } = useSelector((state) => state.likedSong);
  console.log("songs: ", songs);
  const dispatch = useDispatch();
  const handleUnLikeClick = async (songId) => {
    dispatch(
      updateLikeThunk({
        user: playlist.user,
        songId: songId,
        playlistId: playlist._id,
      })
    );
  };

  useEffect(() => {
    dispatch(findSongsThunk(playlist._id));
  }, [playlist._id]);

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
        {songs.length === 0 && (
          <div
            className={`text-muted empty-song-cotainer d-flex align-items-center justify-content-center`}
          >
            <h4 className={`p-0 m-0`}>
              <a href={`/search`} className={`text-no-decoration`}>
                Search
              </a>{" "}
              songs and add to your playlist
            </h4>
          </div>
        )}

        {songs.map((item, idx) => (
          <PlayListDetailItem
            key={idx}
            song={item}
            handleUnLikeClick={handleUnLikeClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PlayListDetail;
