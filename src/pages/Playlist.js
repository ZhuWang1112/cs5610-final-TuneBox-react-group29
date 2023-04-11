import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaylistBanner from "../components/PlaylistBanner";
import PlayListDetail from "../components/PlayListDetail";
import { findPlaylistDetails } from "../services/playlist-service";

const Playlist = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  let loginUser = localStorage.getItem("currentUser");
  if (loginUser) {
    loginUser = JSON.parse(loginUser);
  }

  const getPlaylistDetails = async (id) => {
    const res = await findPlaylistDetails(id);
    setPlaylist(res.playlist);
  };

  useEffect(() => {
    getPlaylistDetails(id);
  }, [id]);

  return (
    <div>
      {playlist && <PlaylistBanner playlist={playlist} />}
      {playlist && <PlayListDetail playlist={playlist} />}
    </div>
  );
};

export default Playlist;
