import React, { useState, useRef } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsThreeDotsVertical, BsFillFolderSymlinkFill } from "react-icons/bs";
// import { Dropdown, Icon } from "semantic-ui-react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from "react-bootstrap/Overlay";
import { useNavigate } from "react-router";
import "./index.css";
import {changeTrack, updateIsPlaying} from "../../reducers/currentTrack-reducer";
import { getTrackThunk } from "../../services/thunks/track-thunk";
import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
const DetailItem = ({
  type,
  song,
  isLike,
  isSelf,
  playlistsOption,
  handleUnLikeClick,
  handleDelete,
  handleAddToPlaylist,
  handleMovePlaylist,
}) => {
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
      dispatch(changeTrack(song)); //modify
    }
  };

  return (
    <div className={`mt-3`}>
      <div className={`row w-100 p-0 m-0`}>
        <div
          className={`p-0 d-flex align-items-center ${
            type === "album" ? `col` : `col-4`
          }`}
        >
          <img
            src={song.img}
            height={`50px`}
            width={`50px`}
            className={`${type === "album" ? `` : `d-none d-md-inline`}`}
          />
          <h5
            className={`ms-1 text-white fw-fold d-inline mb-0 ${
              type === "album"
                ? `album-detail-songname`
                : `playlist-detail-songname`
            } text-nowrap`}
          >
            {song.songName ? song.songName : "Unknown"}
          </h5>
        </div>
        {type === "playlist" && (
          <div className={`col text-muted d-flex align-items-center p-0`}>
            <h5
              className={`text-white fw-fold d-inline overflow-hidden-format playlist-detail-artist text-nowrap mb-0`}
            >
              {song.artistName ? song.artistName : "Unknown"}
            </h5>
          </div>
        )}

        <div
          className={`text-muted p-0 ${
            type === "album"
              ? `col-2 col-lg-3 col-xl-3 col-xxl-3`
              : `d-none d-xl-flex col-2`
          } d-flex align-items-center`}
        >
          <h5 className={`text-muted fw-fold m-0`}>
            {song.duration ? song.duration : "unknown"}
          </h5>
        </div>
        <div
          className={`${
            isSelf && type === "playlist" ? `col-1` : `col-2`
          } d-flex align-items-center justify-content-start p-0`}
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
          onClick={handlePlay}
        >
          {isPlaying && track.apiSongId === song.apiSongId ? (
            <BsFillPauseCircleFill size={iconSize} className={`text-success`} />
          ) : (
            <BsFillPlayCircleFill size={iconSize} className={`text-success`} />
          )}
        </div>
        {isSelf && playlistsOption && like && type === "playlist" && (
          <div className={`col-2 d-flex align-items-center p-0`}>
            <Dropdown id="playlists">
              <Dropdown.Toggle
                variant="warning"
                id="dropdown-basic"
                className={`bg-muted`}
              >
                <BsFillFolderSymlinkFill
                  size={iconSize}
                  className={`show-more-playlist-option`}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {playlistsOption.map((p) => (
                  <Dropdown.Item
                    onClick={() => {
                      handleMovePlaylist(p._id, song._id);
                    }}
                  >
                    Move to {p.playListName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailItem;
