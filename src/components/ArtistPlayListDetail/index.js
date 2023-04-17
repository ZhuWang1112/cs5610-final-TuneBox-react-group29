import ArtistPlayListDetailItem from "./ArtistPlayListDetailItem"
import { updateLikeSong, deleteLikeSong } from "../../reducers/like-reducer.js";
import { updateLike } from "../../services/like-service.js";
import {
  deleteSongPlaylist,
  createSongPlaylist,
} from "../../services/songPlaylist-service.js";
import "./index.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ArtistPlayListDetail = ({ playlist}) => {
    const { currentUser } = useSelector((state) => state.user);
    const [playlistsOption, setPlaylistsOption] = useState(null);
    const defaultPlaylist = JSON.parse(localStorage.getItem("defaultPlaylist"));
    const dispatch = useDispatch();

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

   return (
       <div>
         {playlist && playlist.songs.map((song, idx) => (
           <ArtistPlayListDetailItem
           key={song._id}
           id={idx}
           song={song}
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