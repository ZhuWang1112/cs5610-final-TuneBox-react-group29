import React, {useEffect, useRef, useState} from "react";
import {FaPlay, FaPause, FaVolumeUp, FaRegPlayCircle, FaRegPauseCircle} from 'react-icons/fa';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateIsPlaying } from "../../reducers/currentTrack-reducer";
import { insertArtistIfNotExist } from "../../services/artist-service";
import { insertSongIfNotExist } from "../../services/song-service";
import {
  createSongPlaylist,
  deleteSongPlaylist,
} from "../../services/songPlaylist-service";
import { SONG_LIMITATION_FOR_REGULAR_USER } from "../../utils/URL";
import { deleteLikeSong, addLikeSong } from "../../reducers/like-reducer.js";
import "./index.css";
import { Link } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MediaPlayer = () => {
  // const song = {
  //     mp3Url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  //     isPlaying: false,
  //     artist: 'Artist Name',
  //     songName: 'Song Title',
  //     img: 'https://example.com/song.jpg'
  // };
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const isPlaying = useSelector((state) => state.currentTrack.isPlaying);
  const { likedSongs } = useSelector((state) => state.likedSong);
  const [currentTime, setCurrentTime] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [volume, setVolume] = useState(1);
  const song = useSelector((state) => state.currentTrack.track);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // This is to switch the song,
    // but it needs to add (if statement) to prevent the default song playing automatically when the page is refreshed
    if (song.img) {
      audioRef.current.play();
    }
  }, [song]);

  const handlePlay = () => {
    // if no song is selected, then show a toast
    if (!song.mp3Url) {
      toast("Please select a song to play", {
        autoClose: 2000, // after 2 seconds
      });
      return;
    }
    dispatch(updateIsPlaying(true));
    audioRef.current.play();
  };

  const handlePause = () => {
    dispatch(updateIsPlaying(false));
    audioRef.current.pause();
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleAudioEnded = () => {
    dispatch(updateIsPlaying(false));
  };

  const handleUnLike = () => {
    const songToDelete = likedSongs.filter(
      (likedSong) => likedSong.apiSongId === song.apiSongId
    );
    // update likedSongs state
    dispatch(deleteLikeSong(song.apiSongId));
    // remove record using userId, songId from songPlaylist table

    if (songToDelete.length > 0) {
      deleteSongPlaylist(currentUser._id, songToDelete[0]._id);
    }
  };

  const handleLike = async () => {
    if (!currentUser) return;
    if (
      !currentUser.isVip &&
      likedSongs &&
      likedSongs.length >= SONG_LIMITATION_FOR_REGULAR_USER
    ) {
      setShowUpgrade(true);
      return;
    }
    // update likedSongs state
    // insert the artist to db if not exist [TODO] change img as artist img rather than album img
    const insertedArtist = await insertArtistIfNotExist({
      api: song.apiArtistId,
      name: song.artistName,
      img: song.img,
    });
    // insert the song to db if not exist
    const insertedSong = await insertSongIfNotExist(song);
    // update state in likedSong reduce
    if (insertedSong.length > 0) {
      dispatch(addLikeSong(insertedSong[0]));
      // insert the song-playlist pair into db
      // get default playlist
      const { _id } = JSON.parse(localStorage.getItem("defaultPlaylist"));
      createSongPlaylist(currentUser._id, insertedSong[0]._id, _id);
    }
  };

  return (
    <div className={"row text-white position-relative"}>
      <div className={"col-2"}>
        <div className={"row"}>
          <div className={" col-6 p-0 m-0"}>
            {song.img && (
              <img src={song.img} alt="Song Cover" style={{ height: "85px" }} />
            )}
            <ToastContainer />
          </div>
          <div className={"d-none d-md-block col-6 p-0 m-0 pt-2 "}>
            {/*<div className="wd-scrolling-text">{song.songName}</div>*/}
            <div className="wd-scrolling-text">{song.songName}</div>
            <div className="wd-scrolling-text" style={{ color: "darkgray", fontSize: "small" }}>
              <Link
                to={`/details/artist/${song.apiArtistId}`}
                className={"wd-link"}
              >
                {song.artistName}
              </Link>
            </div>
            {song.songName &&
              (currentUser ? (
                <>
                  <div>
                    {likedSongs.filter(
                      (val, id) => val.apiSongId === song.apiSongId
                    ).length > 0 ? (
                      <AiFillHeart
                        size={25}
                        className={`text-danger`}
                        onClick={() => handleUnLike()}
                      />
                    ) : (
                      <AiFillHeart
                        size={25}
                        className={`text-muted`}
                        onClick={() => handleLike()}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className={`position-relative`}>
                  <div onClick={() => setShow(!show)}>
                    <AiOutlineHeart size={25} className={`text-muted`} />
                  </div>
                  {show && (
                    <div
                      className={`like-toolkit-div-media position-absolute rounded-3`}
                    >
                      <h5 className={`text-white fw-bold m-2`}>
                        Enjoy your Journey!
                      </h5>
                      <div
                        className={`mt-3 mb-1 d-flex justify-content-center align-items-center`}
                      >
                        <button
                          className={`btn btn-light p-1`}
                          onClick={() => navigate("/login")}
                        >
                          Log in
                        </button>
                        <p
                          className={`text-muted mb-0 ms-3 not-now`}
                          onClick={() => setShow(false)}
                        >
                          Not Now
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className={"col-7 col-lg-8"}>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className={"mt-2"}
        >
          <div onClick={isPlaying ? handlePause : handlePlay}>
            {isPlaying ? (
              <FaRegPauseCircle style={{ width: "32px", height: "32px" }} />
            ) : (
              <FaRegPlayCircle style={{ width: "32px", height: "32px" }} />
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={"mt-0"}
        >
          <input
            type="range"
            min="0"
            max={audioRef.current ? audioRef.current.duration : 0}
            value={currentTime}
            step="0.01"
            onChange={handleSeek}
            style={{
              width: "60%",
              height: "4px",
              background: "transparent",
              outline: "none",
            }}
          />
          <span className={"m-1"}>{formatTime(currentTime)}</span>
        </div>
      </div>

      <div
        className="col-3 col-lg-2 d-none d-md-block"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <FaVolumeUp className={"m-3"} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              width: "100px",
              height: "4px",
            }}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={song.mp3Url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleAudioEnded}
      />
      {showUpgrade && (
        <>
          <div
            className={`col text-white position-absolute upgrade-in-media-div p-3 rounded-3 bg-primary fw-bold`}
          >
            Enjoy your Premium Journey!
            <div className={`text-white upgrade-text`}>
              Upgrade your account to add more songs.
            </div>
            <div
              className={`mt-2 d-flex align-items-center justify-content-end`}
            >
              <button
                className={`btn not-now-btn`}
                onClick={() => setShowUpgrade(false)}
              >
                Not now
              </button>
              <button
                className={` login-btn rounded-pill`}
                onClick={() => {
                  setShowUpgrade(false);
                  navigate("/premium");
                }}
              >
                Upgrade
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
};
export default MediaPlayer;
// <div>{formatTime(currentTime)}</div>