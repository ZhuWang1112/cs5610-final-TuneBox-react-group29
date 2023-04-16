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

const PlayListDetail = ({ playlist, setPlaylist }) => {
  const { songs } = useSelector((state) => state.likedSong);
  const { currentUser } = useSelector((state) => state.user);
  const loginId = currentUser ? currentUser._id : null;
  const defaultPlaylist = JSON.parse(localStorage.getItem("defaultPlaylist"));
  const [playlistsOption, setPlaylistsOption] = useState(null);
  const [playlistRating, setPlaylistRating] = useState(playlist.rating);
  const dispatch = useDispatch();

  let showDelete;
  if (!currentUser || currentUser._id !== playlist.user) {
    showDelete = false;
  } else {
    showDelete = true;
  }

  const handleUnLikeClick = async (id, songId) => {
    if (!currentUser) return;
    if (currentUser._id === playlist.user) {
      dispatch(deleteLikeSong(id));
    } else {
      dispatch(updateLikeSong(id));
    }

    updateLike({
      user: currentUser._id,
      songId: songId,
      playlistId: defaultPlaylist._id,
    });
    // deleteSongPlaylist(loginUser._id, songId);
  };

  const handleAddToPlaylist = async (id, pid, songId) => {
    if (!currentUser) return;
    dispatch(updateLikeSong(id));
    updateLike({
      user: currentUser._id,
      songId: songId,
      playlistId: pid,
    });
  };

  const handleMovePlaylist = async (id, pid, songId) => {
    dispatch(deleteLikeSong(id));
    await deleteSongPlaylist(currentUser._id, songId);
    createSongPlaylist(currentUser._id, songId, pid);
  };

  const fetchLoginUserPlaylists = async (uid) => {
    let myPlaylists = await findPlaylists(uid);
    myPlaylists = myPlaylists.filter((p) => p._id !== playlist._id);
    setPlaylistsOption(myPlaylists);
  };

  useEffect(() => {
    dispatch(checkSongsThunk({ user: loginId, pid: playlist._id })).then(
      () => {}
    );
  }, [playlist._id, loginId]);

  useEffect(() => {
    if (currentUser) {
      fetchLoginUserPlaylists(currentUser._id);
    }
  }, [loginId]);
  return (
    <div className={`mt-3 ms-3 me-3 position-relative`}>
      <h4
        className={`text-white position-absolute playlist-rating d-none d-xl-block`}
      >
        {Math.round(playlist.rating * 10) / 10} rating
      </h4>
      <h4
        className={`text-white position-absolute song-num-pos d-none d-xl-block`}
      >
        {songs.length} songs
      </h4>
      <div className={`row`}>
        <div className={`col`}>
          <div className={`row`}>
            <div className={`col-4`}>
              <h5 className={`fw-fold text-white`}># TITLE</h5>
            </div>
            <div
              className={`${
                currentUser && currentUser._id === playlist.user
                  ? `col-2`
                  : `col-3`
              } text-muted ps-0`}
            >
              <BsFillPersonLinesFill size={30} />
            </div>
            <div className={`col-2 text-muted ps-0 d-none d-xl-flex`}>
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

            {(playlistsOption || !currentUser) &&
              songs.map((item, idx) => (
                <PlayListDetailItem
                  key={item._id}
                  id={idx}
                  song={item}
                  isSelf={currentUser && currentUser._id === playlist.user}
                  playlistsOption={playlistsOption}
                  handleUnLikeClick={handleUnLikeClick}
                  handleAddToPlaylist={handleAddToPlaylist}
                  handleMovePlaylist={handleMovePlaylist}
                />
              ))}
          </div>
        </div>
        <div
          className={`col-4 comment-panel-container me-3 rounded-3 p-0 d-none d-lg-block`}
        >
          <CommentPanel pRating={playlist.rating} setPlaylist={setPlaylist} />
        </div>
      </div>
    </div>
  );
};

export default PlayListDetail;
