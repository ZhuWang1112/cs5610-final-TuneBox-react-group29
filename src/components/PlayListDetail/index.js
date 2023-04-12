import React, { useState, useEffect } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import PlayListDetailItem from "./PlayListDetailItem";
import CommentPanel from "./CommentPanel";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePlaylist } from "../../reducers/playlist-reducer.js";
import { updateLike } from "../../services/like-service.js";
import { updateLikeSong, deleteLikeSong } from "../../reducers/like-reducer.js";
import {
  deleteSongPlaylist,
  createSongPlaylist,
} from "../../services/songPlaylist-service.js";
import { findPlaylists } from "../../services/playlist-service.js";
import {
  findSongsThunk,
  checkSongsThunk,
} from "../../services/thunks/playlist-thunk.js";
import "./index.css";

const PlayListDetail = ({ playlist }) => {
  const { songs } = useSelector((state) => state.likedSong);
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const defaultPlaylist = JSON.parse(localStorage.getItem("defaultPlaylist"));
  const [playlistsOption, setPlaylistsOption] = useState(null);
  const dispatch = useDispatch();

  let showDelete;
  if (!loginUser || loginUser._id !== playlist.user) {
    showDelete = false;
  } else {
    showDelete = true;
  }

  const handleUnLikeClick = async (id, songId) => {
    if (!loginUser) return;
    if (loginUser._id === playlist.user) {
      dispatch(deleteLikeSong(id));
    } else {
      dispatch(updateLikeSong(id));
    }

    updateLike({
      user: loginUser._id,
      songId: songId,
      playlistId: defaultPlaylist._id,
    });
    // deleteSongPlaylist(loginUser._id, songId);
  };

  const handleAddToPlaylist = async (id, pid, songId) => {
    if (!loginUser) return;
    dispatch(updateLikeSong(id));
    updateLike({
      user: loginUser._id,
      songId: songId,
      playlistId: pid,
    });
  };

  const handleMovePlaylist = async (id, pid, songId) => {
    dispatch(deleteLikeSong(id));
    await deleteSongPlaylist(loginUser._id, songId);
    createSongPlaylist(loginUser._id, songId, pid);
  };

  const addToPlaylist = async (songId) => {};
  const fetchLoginUserPlaylists = async (uid) => {
    let myPlaylists = await findPlaylists(uid);
    myPlaylists = myPlaylists.filter((p) => p._id !== playlist._id);
    setPlaylistsOption(myPlaylists);
  };

  useEffect(() => {
    dispatch(checkSongsThunk({ user: loginUser._id, pid: playlist._id }));
  }, [playlist._id]);

  useEffect(() => {
    if (loginUser) {
      fetchLoginUserPlaylists(loginUser._id);
    }
  }, [loginUser && loginUser._id]);
  return (
    <div className={`mt-3 ms-3 me-3 position-relative`}>
      <h4 className={`text-white position-absolute song-num-pos`}>
        {songs.length} songs
      </h4>
      <div className={`row`}>
        <div className={`col`}>
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

            {playlistsOption &&
              songs.map((item, idx) => (
                <PlayListDetailItem
                  key={item._id}
                  id={idx}
                  song={item}
                  isSelf={loginUser && loginUser._id === playlist.user}
                  showDelete={showDelete}
                  playlistsOption={playlistsOption}
                  handleUnLikeClick={handleUnLikeClick}
                  handleAddToPlaylist={handleAddToPlaylist}
                  handleMovePlaylist={handleMovePlaylist}
                />
              ))}
          </div>
        </div>
        <div className={`col-4 comment-panel-container me-3 rounded-3 p-0`}>
          <CommentPanel />
        </div>
      </div>
    </div>
  );
};

export default PlayListDetail;
