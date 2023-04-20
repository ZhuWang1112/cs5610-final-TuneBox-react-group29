import React, { useState, useRef } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {BsFillPauseCircleFill, BsFillPlayCircleFill} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsThreeDotsVertical, BsFillFolderSymlinkFill } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from "react-bootstrap/Overlay";
import { useNavigate } from "react-router";
import "./index.css";
import {updateIsPlaying} from "../../reducers/currentTrack-reducer";
import { getTrackThunk } from "../../services/thunks/track-thunk";

const ArtistPlayListDetailItem = ({
  song,
  isLike,
  playlistsOption,
  handleUnLikeClick,
  handleAddToPlaylist,
}) => {
  console.log("song in detail: ", song);
  const [like, setLike] = useState(isLike);
  const iconSize = 25;
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // playing status -- boolean
  const isPlaying = useSelector((state) => state.currentTrack.isPlaying);
  // current song
  const track = useSelector((state) => state.currentTrack.track);

  const handlePlay = () => {
    if (track.apiSongId === song.apiSongId) {
      //modify
      dispatch(updateIsPlaying(!isPlaying));
    } else {
      dispatch(getTrackThunk(song)); //modify
    }
  };

  return (
    <div className={`mt-3`}>
      <div className={`row w-100 p-0 m-0`}>
        <div className={`col-4 p-0 d-flex align-items-center`}>
          <img
            src={song.img}
            height={`50px`}
            width={`50px`}
            className={`d-none d-md-inline`}
          />
          <h5
            className={`ms-1 text-white fw-fold d-inline artist-song-detail-songname text-nowrap`}
          >
            {song.songName}
          </h5>
        </div>
        <div className={`col text-muted d-flex align-items-center p-0`}>
          <h5
            className={`text-white fw-fold d-inline overflow-hidden-format artist-song-detail-artist text-nowrap`}
          >
            {song.artist}
          </h5>
        </div>
        <div
          className={`col-2 text-muted p-0 d-none d-xl-flex d-flex align-items-center`}
        >
          <h5 className={`text-muted fw-fold m-0`}>{song.duration}</h5>
        </div>
        <div
          className={`col-2 d-flex align-items-center justify-content-start p-0`}
        >
          {like && (
            <AiFillHeart
              size={iconSize}
              className={`text-danger`}
              onClick={() => {
                setLike(false);
                handleUnLikeClick(song);
              }}
            />
          )}
          {!like && (
            <>
              {!playlistsOption && (
                <>
                  <div className={`position-relative`}>
                    <div onClick={() => setShow(!show)}>
                      <AiOutlineHeart
                        size={iconSize}
                        className={`text-muted`}
                      />
                    </div>
                    {show && (
                      <div
                        className={`like-toolkit-div position-absolute rounded-3`}
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
                </>
              )}

              {playlistsOption && (
                <div className={`d-flex align-items-center`}>
                  <Dropdown id="playlists">
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdown-basic"
                      className={`bg-muted`}
                    >
                      <AiFillHeart size={iconSize} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {playlistsOption.map((p) => (
                        <Dropdown.Item
                          onClick={() => {
                            // setLike(true);
                            handleAddToPlaylist(p._id, song, setLike);
                          }}
                        >
                          Add to {p.playListName}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </>
          )}
        </div>
        <div
          className={`col-1 d-flex align-items-center p-0`}
          onClick={() => handlePlay()}
        >
          {isPlaying && track.apiSongId === song.apiSongId ? (
            <BsFillPauseCircleFill size={iconSize} className={`text-success`} />
          ) : (
            <BsFillPlayCircleFill size={iconSize} className={`text-success`} />
          )}
        </div>
      </div>
    </div>
  );
};
export default ArtistPlayListDetailItem;