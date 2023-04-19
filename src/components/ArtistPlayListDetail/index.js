import React, { useState, useEffect } from "react";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";


import ArtistPlayListDetailItem from "./ArtistPlayListDetailItem"
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

const ArtistPlayListDetail = ({playlist}) => {
    const { likedSongs } = useSelector((state) => state.likedSong);
    const { currentUser } = useSelector((state) => state.user);
    const loginId = currentUser ? currentUser._id : null;
    const [playlistsOption, setPlaylistsOption] = useState(null);
    const defaultPlaylist = JSON.parse(localStorage.getItem("defaultPlaylist"));
    const [songsNumber, setSongsNumber] = useState(null);
    // const [playlistRating, setPlaylistRating] = useState(playlist.rating);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const SONG_LIMITATION_FOR_REGULAR_USER = 1;

    const handleUnLikeClick = async (songId) => {
        if (!currentUser) return;
        // update state in likedSong reducer
        dispatch(deleteLikeSong(songId));
        //if (currentUser._id === playlist.user) {
        //  // remove the song from playlist in UI
        //  setSongs((prev) => prev.filter((s) => s.songId._id !== songId));
        //}
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
       //setSongs((prev) => prev.filter((s) => s.songId._id !== songId));
       //await updateSongPlaylist({
       //  userId: currentUser._id,
       //  songId: songId,
       //  playlistId: pid,
       //});
     };

     const fetchLoginUserPlaylists = async (uid) => {
         let myPlaylists = await findPlaylists(uid);
         myPlaylists = myPlaylists.filter((p) => p._id !== playlist._id);
         setPlaylistsOption(myPlaylists);
         // find how many songs current user likes
         const songNumbersOfLoginUser = await findSongNumberByUserId(uid);
         setSongsNumber(songNumbersOfLoginUser);
     };

     //const fetchSongsInPlaylist = async (pid) => {
     //    const songs = await findSongsByPlaylistId(pid);
     //    console.log("songs in fetchSongsInPlaylist ", songs);
     //    setSongs(songs);
     //};

     //useEffect(() => {
     //    // fetch all songs in current playlist
     //    fetchSongsInPlaylist([playlist._id]);
     //}, [playlist._id]);

   return (
       <div>
         {playlist && playlist.songs.map((song, idx) => (
           <ArtistPlayListDetailItem
           key={song._id}
           song={song}
           isLike={
                likedSongs.filter(
                (val, id) => val.apiSongId === song.songId.apiSongId
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
     );
};
export default ArtistPlayListDetail;