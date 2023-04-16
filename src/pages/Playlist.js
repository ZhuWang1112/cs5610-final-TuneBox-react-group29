import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaylistBanner from "../components/PlaylistBanner";
import PlayListDetail from "../components/PlayListDetail";
import { findPlaylistDetails } from "../services/playlist-service";
import { findUserByIdThunk } from "../services/users/users-thunks";
import { useDispatch, useSelector } from "react-redux";
const Playlist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [playlist, setPlaylist] = useState(null);
  const loginUser = JSON.parse(localStorage.getItem("currentUser"));
  const { currentUser } = useSelector((state) => state.user);
  const getPlaylistDetails = async (id) => {
    const res = await findPlaylistDetails(id);
    setPlaylist(res.playlist);
  };

  useEffect(() => {
    getPlaylistDetails(id);
    if (!loginUser) {
      return;
    }
    dispatch(findUserByIdThunk(loginUser._id));
  }, [id]);

  return (
    <div>
      {playlist && <PlaylistBanner playlist={playlist} />}
      {playlist && (
        <PlayListDetail playlist={playlist} setPlaylist={setPlaylist} />
      )}
    </div>
  );
};

export default Playlist;
