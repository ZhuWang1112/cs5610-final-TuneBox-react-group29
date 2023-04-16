import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import LikeSongItem from "./LikeSongItem.js";
import { updateLike } from "../../services/like-service.js";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfileSongs } from "../../reducers/like-reducer.js";

const LikeSongs = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { currentProfile } = useSelector((state) => state.profile);
  let { profileSongs } = useSelector((state) => state.likedSong);

  const handleRemoveSong = async (song) => {
    dispatch(deleteProfileSongs(song._id));

    updateLike({
      user: currentUser._id,
      songId: song._id,
      playlistId: null,
    });
  };

  let data = [
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
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth > 760 ? 760 : window.innerWidth
  );

  const handleResize = () => {
    setWindowWidth(window.innerWidth > 760 ? 760 : window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let displayNum = Math.floor(windowWidth / 150);
  data = data.slice(0, displayNum);

  return (
    <div className={`mt-5 pt-5`}>
      <div className={`row song-outer-container`}>
        <div className={`col-7 p-0`}>
          <h4 className={`text-white`}>Songs Favorite</h4>
        </div>
        {profileSongs && (
          <div className={`col p-0 d-flex justify-content-end`}>
            {profileSongs.length > displayNum && (
              <Link to={`/song/${uid ? uid : currentUser._id}`}>
                <p className={`text-warning mb-0`}>View More</p>
              </Link>
            )}
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
        {profileSongs &&
          profileSongs.length > 0 &&
          profileSongs.map((song) => (
            <LikeSongItem
              song={song}
              handleRemoveSong={handleRemoveSong}
              isSelf={uid ? false : true}
            />
          ))}
        {/* {data.map((item) => (
          <LikeSongItem song={item} />
        ))} */}

        {profileSongs && profileSongs.length === 0 && (
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
