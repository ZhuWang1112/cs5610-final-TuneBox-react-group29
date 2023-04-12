import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsThreeDotsVertical, BsFillFolderSymlinkFill } from "react-icons/bs";
// import { Dropdown, Icon } from "semantic-ui-react";
import Dropdown from "react-bootstrap/Dropdown";

const PlayListDetailItem = ({
  id,
  song,
  isSelf,
  showDelete,
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
  const [playlist, setPlaylist] = useState("");
  const DropdownPlaylistOptions = playlistsOption.map((playlist, idx) => {
    return {
      key: playlist._id,
      text: playlist.playListName,
      value: playlist.playListName,
      // image: { avatar: false, src: playlist.img },
      // style: { width: "20px", height: "20px" },
    };
  });
  return (
    <div className={`mt-3 ms-3 me-3`}>
      <div className={`row`}>
        <div className={`col-4`}>
          <img src={`/images/${song.img}`} height={`50px`} width={`50px`} />
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
              {/* <AiOutlineHeart
                size={iconSize}
                className={`text-muted`}
                onClick={() => handleUnLikeClick(id, song._id)}
              /> */}
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
            </>
          )}
        </div>
        <div className={`col d-flex align-items-center ps-0`}>
          <BsFillPlayCircleFill size={iconSize} className={`text-success`} />
        </div>
        {isSelf && checkSong[id] && (
          <div className={`col`}>
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
