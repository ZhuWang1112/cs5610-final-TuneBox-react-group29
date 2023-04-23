import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import ArtistPlayListDetailItem from "./ArtistPlayListDetailItem";
import { deleteLikeSong, addLikeSong } from "../../reducers/like-reducer.js";

import {
  deleteSongPlaylist,
  createSongPlaylist,
  findSongNumberByUserId,
} from "../../services/songPlaylist-service.js";
import { findPlaylists } from "../../services/playlist-service.js";
import { SONG_LIMITATION_FOR_REGULAR_USER } from "../../utils/URL";
import "./index.css";

const ArtistPlayListDetail = ({ songs }) => {
  const { likedSongs } = useSelector((state) => state.likedSong);
  const { currentUser } = useSelector((state) => state.user);
  const loginId = currentUser ? currentUser._id : null;
  const [playlistsOption, setPlaylistsOption] = useState(null);
  const [songsNumber, setSongsNumber] = useState(null);
  // const [playlistRating, setPlaylistRating] = useState(playlist.rating);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUnLikeClick = async (song) => {
    if (!currentUser) return;
    // update state in likedSong reducer
    dispatch(deleteLikeSong(song.apiSongId));
    deleteSongPlaylist(currentUser._id, song._id);
  };

  const handleAddToPlaylist = async (pid, songIdObj, setLike) => {
    if (!currentUser) return;
    const { _id } = songIdObj;
    if (
      !currentUser.isVip &&
      likedSongs.length >= SONG_LIMITATION_FOR_REGULAR_USER
    ) {
      setShowUpgrade(true);
      return;
    }
    setLike(true);
    // update state in likedSong reducer
    dispatch(addLikeSong(songIdObj));
    createSongPlaylist(currentUser._id, _id, pid);
  };

  const fetchLoginUserPlaylists = async (uid) => {
    const myPlaylists = await findPlaylists(uid);
    setPlaylistsOption(myPlaylists);
    // find how many songs current user likes
    const songNumbersOfLoginUser = await findSongNumberByUserId(uid);
    setSongsNumber(songNumbersOfLoginUser);
  };

  useEffect(() => {
    // fetch all songs of artists
    if (currentUser) fetchLoginUserPlaylists(currentUser._id);
  }, [loginId, songs[0].apiArtistId]);

  return (
    <div className={`position-relative`}>
      {songs &&
        songs.map((song, idx) => (
          <ArtistPlayListDetailItem
            key={song._id}
            song={song}
            isLike={
              likedSongs.filter((val, id) => val.apiSongId === song.apiSongId)
                .length > 0
            }
            playlistsOption={playlistsOption}
            handleUnLikeClick={handleUnLikeClick}
            handleAddToPlaylist={handleAddToPlaylist}
          />
        ))}
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
    </div>
  );
};
export default ArtistPlayListDetail;
