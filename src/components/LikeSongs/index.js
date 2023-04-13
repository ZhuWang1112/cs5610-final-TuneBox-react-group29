import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import LikeSongItem from "./LikeSongItem.js";
import LikeSongDetail from "./LikeSongDetail.js";
import { findLikedSongs } from "../../services/like-service.js";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { findProfileSongsThunk } from "../../services/thunks/like-thunk.js";
const LikeSongs = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentProfile } = useSelector((state) => state.profile);
  const { profileSongs } = useSelector((state) => state.likedSong);

  const displayNum = 6;
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ];
  return (
    <div className={`mt-5 pt-5`}>
      <div className={`row song-outer-container`}>
        <div className={`col-7 p-0`}>
          <h4 className={`text-white`}>Songs Favorite</h4>
        </div>
        <div className={`col p-0 d-flex justify-content-end`}>
          {data.length > displayNum && (
            <Link to={`/song/${uid ? uid : currentUser._id}`}>
              <p className={`text-warning mb-0`}>View More</p>
            </Link>
          )}
        </div>
      </div>

      <div className={`d-flex mt-3 like-song-container`}>
        {profileSongs &&
          profileSongs.map((song) => <LikeSongItem song={song} />)}
        {/* {data.slice(0, displayNum).map((item) => (
          <LikeSongItem song={item} />
        ))} */}
      </div>
    </div>
  );
};

export default LikeSongs;
