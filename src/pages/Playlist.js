import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaylistBanner from "../components/PlaylistBanner";
import PlayListDetail from "../components/PlayListDetail";
import { findPlaylistDetails } from "../services/playlist-service";
import {
  findUserByIdThunk,
  findCurrentUserThunk,
} from "../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../services/thunks/like-thunk";
import { useDispatch, useSelector } from "react-redux";
const Playlist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState(null);
  const [playlistUser, setPlaylistUser] = useState(null);
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const { currentUser } = useSelector((state) => state.user);
  const getPlaylistDetails = async (id) => {
    const res = await findPlaylistDetails(id);
    console.log("res in getPlaylistDetails", res);
    setPlaylist(res.playlist);
    setPlaylistUser(res.user);
  };

  useEffect(() => {
    getPlaylistDetails(id);
    if (!loginUser) {
      return;
    }
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
  }, [id]);

  return (
    <div>
      {playlist && playlistUser && (
        <PlaylistBanner
          playlistUser={playlistUser}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />
      )}
      {playlist && (
        <PlayListDetail playlist={playlist} setPlaylist={setPlaylist} />
      )}
    </div>
  );
};

export default Playlist;
