import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import LikeSongItem from "./LikeSongItem.js";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteLikeSong } from "../../reducers/like-reducer.js";
import {
  findLikedSongsByUser,
  deleteSongPlaylist,
} from "../../services/songPlaylist-service.js";

const LikeSongs = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { likedSongs } = useSelector((state) => state.likedSong);
  const [profileSongs, setProfileSongs] = useState(null);

  const handleRemoveSong = async (song) => {
    dispatch(deleteLikeSong(song.apiSongId));
    deleteSongPlaylist(currentUser._id, song._id);
  };

  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth > 760 ? 760 : window.innerWidth
  );
  const [displayNum, setDisplayNum] = useState(
    window.innerWidth > 1575
      ? 6
      : window.innerWidth > 1055
      ? 5
      : window.innerWidth > 630
      ? 4
      : 3
  );

  const handleResize = () => {
    // setWindowWidth(window.innerWidth > 760 ? 760 : window.innerWidth);
    setDisplayNum(
      window.innerWidth > 1575
        ? 6
        : window.innerWidth > 1055
        ? 5
        : window.innerWidth > 630
        ? 4
        : 3
    );
  };
  const fetchProfileSongs = async (uid) => {
    const songs = await findLikedSongsByUser(uid);
    setProfileSongs(songs);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (uid) {
      //if others, fetch likedSongs
      fetchProfileSongs(uid);
    }
  }, [uid]);

  return (
    <div className={`mt-5 pt-5`}>
      <div className={`row song-outer-container`}>
        <div className={`col-7 p-0`}>
          <h4 className={`text-white`}>Songs Favorite</h4>
        </div>
        {uid && profileSongs && (
          <div
            className={`col p-0 d-flex justify-content-end align-items-center me-3`}
          >
            <Link to={`/song/${uid ? uid : currentUser._id}`}>
              <p className={`text-warning mb-0`}>View More</p>
            </Link>
          </div>
        )}
        {!uid && likedSongs && (
          <div
            className={`col p-0 d-flex justify-content-end align-items-center me-3`}
          >
            <Link to={`/song/${uid ? uid : currentUser._id}`}>
              <p className={`text-warning mb-0`}>View More</p>
            </Link>
          </div>
        )}
      </div>

      <div
        className={`d-flex mt-3 like-song-container`}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {uid &&
          profileSongs &&
          profileSongs.length > 0 &&
          profileSongs
            .slice(0, displayNum)
            .map((song) => (
              <LikeSongItem
                song={song.songId}
                handleRemoveSong={handleRemoveSong}
                isSelf={uid ? false : true}
              />
            ))}
        {!uid &&
          likedSongs &&
          likedSongs.length > 0 &&
          likedSongs
            .slice(0, displayNum)
            .map((song) => (
              <LikeSongItem
                song={song}
                handleRemoveSong={handleRemoveSong}
                isSelf={uid ? false : true}
              />
            ))}

        {((uid && profileSongs && profileSongs.length === 0) ||
          (!uid && likedSongs && likedSongs.length === 0)) && (
          <div
            className={`no-playlist d-flex justify-content-center align-items-center`}
          >
            <h5>No Songs yet...</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikeSongs;
