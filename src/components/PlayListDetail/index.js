import React, { useState, useEffect } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import PlayListDetailItem from "./PlayListDetailItem";
import CommentPanel from "./CommentPanel";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { updatePlaylist } from "../../reducers/playlist-reducer.js";
import {
  updateLikeSong,
  deleteLikeSong,
  addLikeSong,
} from "../../reducers/like-reducer.js";

import {
  deleteSongPlaylist,
  createSongPlaylist,
  findSongNumberByUserId,
  findSongsByPlaylistId,
  updateSongPlaylist,
} from "../../services/songPlaylist-service.js";
import { findPlaylists } from "../../services/playlist-service.js";
import "./index.css";

const PlayListDetail = ({ playlist, setPlaylist }) => {
  // const { songs } = useSelector((state) => state.likedSong);
  // likedSongs of current login user
  const { likedSongs } = useSelector((state) => state.likedSong);
  console.log("likedSongs", likedSongs);
  const [songs, setSongs] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const loginId = currentUser ? currentUser._id : null;
  const defaultPlaylist = JSON.parse(localStorage.getItem("defaultPlaylist"));
  const [playlistsOption, setPlaylistsOption] = useState(null);
  const [songsNumber, setSongsNumber] = useState(null);
  const [playlistRating, setPlaylistRating] = useState(playlist.rating);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const SONG_LIMITATION_FOR_REGULAR_USER = 1;
  console.log("currentUser in playlist", currentUser);
  let showDelete;
  if (!currentUser || currentUser._id !== playlist.user) {
    showDelete = false;
  } else {
    showDelete = true;
  }

  const handleUnLikeClick = async (songId) => {
    if (!currentUser) return;
    // update state in likedSong reducer
    dispatch(deleteLikeSong(songId));
    if (currentUser._id === playlist.user) {
      // remove the song from playlist in UI
      setSongs((prev) => prev.filter((s) => s.songId._id !== songId));
    }

    deleteSongPlaylist(currentUser._id, songId);
  };

  const handleAddToPlaylist = async (pid, songIdObj, setLike) => {
    if (!currentUser) return;
    const { _id } = songIdObj;
    if (!currentUser.isVip && songsNumber >= SONG_LIMITATION_FOR_REGULAR_USER) {
      setShowUpgrade(true);
      return;
    }
    setLike(true);
    // update state in likedSong reducer
    dispatch(addLikeSong(songIdObj));
    createSongPlaylist(currentUser._id, _id, pid);
  };

  const handleMovePlaylist = async (pid, songId) => {
    // remove song from current playlist
    setSongs((prev) => prev.filter((s) => s.songId._id !== songId));
    await updateSongPlaylist({
      userId: currentUser._id,
      songId: songId,
      playlistId: pid,
    });
  };

  const fetchLoginUserPlaylists = async (uid) => {
    let myPlaylists = await findPlaylists(uid);
    myPlaylists = myPlaylists.filter((p) => p._id !== playlist._id);
    setPlaylistsOption(myPlaylists);
    // find how many songs current user likes
    const songNumbersOfLoginUser = await findSongNumberByUserId(uid);
    setSongsNumber(songNumbersOfLoginUser);
  };

  const fetchSongsInPlaylist = async (pid) => {
    const songs = await findSongsByPlaylistId(pid);
    console.log("songs in fetchSongsInPlaylist ", songs);
    setSongs(songs);
  };
  useEffect(() => {
    // fetch all songs in current playlist
    fetchSongsInPlaylist([playlist._id]);
  }, [playlist._id]);

  useEffect(() => {
    if (currentUser) {
      fetchLoginUserPlaylists(currentUser._id);
    }
  }, [loginId]);
  return (
    <>
      {songs && (
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
          {showUpgrade && (
            <>
              <div
                className={`col text-white position-absolute upgrade-in-playlist-div p-3 rounded-3 bg-primary fw-bold`}
              >
                Enjoy your Premium Journey!
                <div className={`text-white upgrade-text`}>
                  Upgrade your account to add more songs.
                </div>
                <div
                  className={`mt-2 d-flex align-items-center justify-content-end`}
                >
                  <button
                    className={`btn not-now-btn`}
                    onClick={() => setShowUpgrade(false)}
                  >
                    Not now
                  </button>
                  <button
                    className={` login-btn rounded-pill`}
                    onClick={() => {
                      setShowUpgrade(false);
                      navigate("/premium");
                    }}
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            </>
          )}
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
                  ((currentUser && songsNumber !== null) || !currentUser) &&
                  songs.map((item, idx) => (
                    <PlayListDetailItem
                      key={item._id + playlist._id}
                      song={item}
                      isLike={
                        likedSongs.filter(
                          (val, id) => val.apiSongId === item.songId.apiSongId
                        ).length > 0
                      }
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
              <CommentPanel
                pRating={playlist.rating}
                setPlaylist={setPlaylist}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayListDetail;
