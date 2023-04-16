import React, { useState, useRef } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
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
const PlayListDetailItem = ({
  id,
  song,
  isSelf,
  playlistsOption,
  handleUnLikeClick,
  handleDelete,
  handleAddToPlaylist,
  handleMovePlaylist,
}) => {
  console.log("playlistsOption, ", playlistsOption);
  console.log("isSelf", isSelf);
  const { checkSong } = useSelector((state) => state.likedSong);
  const iconSize = 25;
  const renderTooltip = (props) => <Tooltip {...props}>Login to like</Tooltip>;
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();
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
          <h5 className={`ms-2 text-white fw-fold d-inline`}>
            {song.songName}
          </h5>
        </div>
        <div className={`col text-muted d-flex align-items-center p-0`}>
          <h5 className={`text-white fw-fold d-inline overflow-hidden-format`}>
            {song.artist}
          </h5>
        </div>
        <div
          className={`col-2 text-muted ps-0 d-none d-xl-flex d-flex align-items-center`}
        >
          <h5 className={`text-muted fw-fold m-0`}>{song.duration}</h5>
        </div>
        <div className={`col-1 d-flex align-items-center p-0`}>
          {checkSong[id] && (
            <AiFillHeart
              size={iconSize}
              className={`text-danger`}
              onClick={() => handleUnLikeClick(id, song._id)}
            />
          )}
          {!checkSong[id] && (
            <>
              {!playlistsOption && (
                <>
                  <>
                    <div ref={target} onClick={() => setShow(!show)}>
                      <AiOutlineHeart
                        size={iconSize}
                        className={`text-muted`}
                        // onClick={() => handleUnLikeClick(id, song._id)}
                      />
                    </div>
                    <Overlay
                      target={target.current}
                      show={show}
                      placement="right"
                    >
                      {(props) => (
                        <Tooltip
                          // id="overlay-example"
                          {...props}
                          className={`toolkit-like`}
                        >
                          <div className={`w-100 d-block`}>
                            <h5 className={`text-nowrap`}>
                              Enjoy your Journey!
                            </h5>
                            <p className={`toolkit-like-text mb-2 float-start`}>
                              <a
                                href={`/login`}
                                className={`toolkit-like-text text-warning`}
                              >
                                Login
                              </a>{" "}
                              to add songs
                            </p>
                          </div>
                          {/* <div className={``}> */}
                          <div className={` toolkit-like-text mt-3 mb-1`}>
                            <button
                              className={`btn btn-secondary p-1`}
                              onClick={() => setShow(false)}
                            >
                              Not Now
                            </button>
                          </div>
                          {/* </div> */}
                        </Tooltip>
                      )}
                    </Overlay>
                  </>
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
                            handleAddToPlaylist(id, p._id, song._id);
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
        <div className={`col-1 d-flex align-items-center ps-0`}>
          <BsFillPlayCircleFill size={iconSize} className={`text-success`} />
        </div>
        {isSelf && playlistsOption && checkSong[id] && (
          <div className={`col-2 d-flex align-items-center`}>
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
                      handleMovePlaylist(id, p._id, song._id);
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

export default PlayListDetailItem;
