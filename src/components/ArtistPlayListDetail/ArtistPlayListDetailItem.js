import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical, BsFillFolderSymlinkFill } from "react-icons/bs";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Tooltip from "react-bootstrap/Tooltip";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Overlay from "react-bootstrap/Overlay";

const ArtistPlayListDetailItem = ({
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
          <div className={`mt-3 ms-3 me-3`}>
            <div className={`row`}>
              <div className={`col-4`}>
                <img src={song.img} height={`50px`} width={`50px`} />
                <h5 className={`ms-3 text-white fw-fold d-inline`}>
                  {song.songName}
                </h5>
              </div>
              <div className={`col-2 text-muted d-flex align-items-center ps-0`}>
                <h5 className={`text-white fw-fold d-inline`}>{song.artist}</h5>
              </div>
              <div className={`col-2 text-muted d-flex align-items-center ps-0`}>
                <h5 className={`text-muted fw-fold`}>{song.duration}</h5>
              </div>
              <div className={`col d-flex align-items-center ps-0`}>
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
              <div className={`col d-flex align-items-center ps-0`}>
                <BsFillPlayCircleFill size={iconSize} className={`text-success`} />
              </div>
              {isSelf && playlistsOption && checkSong[id] && (
                <div className={`col d-flex align-items-center`}>
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

     //{
      //  return (
      //    <div>
      //      <img src={song.img} alt={`${song.songName} - ${song.artist}`} />
      //      <p>{song.songName} - {song.artist}</p>
      //      <p>{song.duration}</p>
      //    </div>
      //  );
      //}

export default ArtistPlayListDetailItem;