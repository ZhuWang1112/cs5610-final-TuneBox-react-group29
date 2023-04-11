import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaylistBanner from "../components/PlaylistBanner";
import PlayListDetail from "../components/PlayListDetail";
import { findPlaylistDetails } from "../services/playlist-service";
import { findUser } from "../services/user-service";
const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [user, setUser] = useState(null);
  const loginUser = localStorage.getItem("userId");

  const getPlaylistDetails = async (id) => {
    const res = await findPlaylistDetails(id);
    setPlaylist(res.playlist);
    // setUser(res.user);
  };

  const fetchUser = async (id) => {
    const res = await findUser(id);
    setUser(res);
  };

  useEffect(() => {
    getPlaylistDetails(id);
    fetchUser(loginUser);
  }, [id, loginUser]);

  return (
    <div>
      {playlist && <PlaylistBanner playlist={playlist} />}
      {playlist && user && (
        <PlayListDetail key={Date.now()} playlist={playlist} user={user} />
      )}
    </div>
  );
};

export default Playlist;
