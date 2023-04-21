import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import {getAlbumGeneralInfoByAlbumId, getTracksByAlbumId} from "../services/track-service.js";
import { useSelector, useDispatch } from "react-redux";
import AlbumBanner from "../components/AlbumComponents/AlbumBanner";
import AlbumSongs from "../components/AlbumComponents/AlbumSongs";
import { findCurrentUserThunk } from "../services/users/users-thunks.js";
import { findCurrentUserSongsThunk } from "../services/thunks/like-thunk";
const AlbumDetail = () => {
  // const location = useLocation();
  // let title = "UnKnown";
  // if (location.state) {
  //   title = location.state.title;
  // }
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { likedSongs } = useSelector((state) => state.likedSong);
  console.log("likedSongs in album", likedSongs);
  const loginId = currentUser ? currentUser._id : null;
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");

  const fetchSongsInAlbums = async (albumId) => {
    const data = await getTracksByAlbumId(albumId);
    console.log("data in fetchSongsInAlbums", data);
    setSongs(data);
  };
  const fetchAlbumGeneralInfoByAlbumId = async (albumId) => {
    const data = await getAlbumGeneralInfoByAlbumId(albumId);
    setTitle(data.albumName);
  }

  useEffect(() => {
    if (currentUser) {
      dispatch(findCurrentUserSongsThunk());
    }
  }, [loginId]);

  useEffect(() => {
    dispatch(findCurrentUserThunk());
    fetchSongsInAlbums(id);
    fetchAlbumGeneralInfoByAlbumId(id);
  }, [id]);

  return (
    <div className={`position-relative`}>
      <AlbumBanner
        title={title}
        artist={songs.length === 0 ? "Unknown" : songs[0].artist}
        img={songs.length === 0 ? "" : songs[0].img}
        songNumber={songs.length}
      />

      <AlbumSongs songs={songs} />
    </div>
  );
};

export default AlbumDetail;
