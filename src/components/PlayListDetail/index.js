import React, { useState } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import PlayListDetailItem from "./PlayListDetailItem";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaylist } from "../../reducers/playlist-reducer.js";
import { updateLike } from "../../services/like-service.js";
import "./index.css";

const PlayListDetail = ({ playlist }) => {
  console.log(playlist);
  // const playlists = useSelector((state) => state.playlist);
  // const playlist = playlists.filter((item) => item._id == id)[0];
  const dispatch = useDispatch();
  const handleUnLikeClick = async (songId) => {
    // const newSongs = playlist.songs.filter((item, idx) => item !== id);
    // const newPlaylist = { ...playlist, songs: newSongs };
    // dispatch(updatePlaylist(newPlaylist));
    await updateLike(playlist.user, {
      songId: songId,
      playlistId: playlist._id,
    });
  };

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
        {playlist.songs.length === 0 && (
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

        {playlist.songs.map((item, idx) => (
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
