import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import {getAlbumGeneralInfoByAlbumId, getTracksByAlbumId} from "../services/track-service.js";
import { useSelector, useDispatch } from "react-redux";
import AlbumBanner from "../components/AlbumComponents/AlbumBanner";
import AlbumSongs from "../components/AlbumComponents/AlbumSongs";
import { findCurrentUserThunk } from "../services/users/users-thunks.js";
import { findCurrentUserSongsThunk } from "../services/thunks/like-thunk";

const AlbumDetail = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { likedSongs } = useSelector((state) => state.likedSong);
  const loginId = currentUser ? currentUser._id : null;
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");

  const fetchSongsInAlbums = async (albumId) => {
    const data = await getTracksByAlbumId(albumId);
    setSongs(data);
  };
  const fetchAlbumGeneralInfoByAlbumId = async (albumId) => {
    const data = await getAlbumGeneralInfoByAlbumId(albumId);
    setTitle(data.albumName);
  };

  useEffect(() => {
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
    fetchSongsInAlbums(id);
    fetchAlbumGeneralInfoByAlbumId(id);
  }, [id]);

  return (
    <div className={`position-relative`}>
      <AlbumBanner
        title={title}
        artistName={songs.length === 0 ? "Unknown" : songs[0].artistName}
        img={songs.length === 0 ? "" : songs[0].img}
        songNumber={songs.length}
        apiArtistId={songs.length === 0 ? "" : songs[0].apiArtistId}
      />

      <AlbumSongs songs={songs} />
    </div>
  );
};

export default AlbumDetail;
