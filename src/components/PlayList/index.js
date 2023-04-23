import React, { useState, useEffect } from "react";
import "./index.css";
import PlayListItem from "./PlayListItem";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  findPlaylists as findPlaylistsService,
  deletePlaylist,
} from "../../services/playlist-service";
import { createPlaylist } from "../../services/playlist-service";
import { updateUserNonAdminThunk } from "../../services/users/users-thunks";
import { updateLikeSong } from "../../reducers/like-reducer";

const PlayList = ({ isSelf, setComments }) => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [playlists, setPlaylists] = useState(null);
  const [playlistPerPage, setPlaylistPerPage] = useState(
    window.innerWidth > 1630
      ? 4
      : window.innerWidth > 750
      ? 3
      : window.innerWidth > 559
      ? 2
      : 1
  );
  const dispatch = useDispatch();
  const handleClick = (playlist_id) => {
    navigate(`/details/playlist/${playlist_id}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const addPlaylist = async () => {
    if (!currentUser.isVip && playlists.length >= 3) {
      setShow(true);
      return;
    }
    const curPlaylist = playlists.length;
    const newName = `My Playlist ${curPlaylist + 1}`;
    const newPlaylist = {
      user: currentUser._id,
      playListName: newName,
      description: "",
      songs: [],
      isDefault: false,
      img: "/images/playlist-cover.jpeg",
      rating: 0,
    };
    const response = await createPlaylist({
      playlist: newPlaylist,
      cnt: curPlaylist + 1,
    });
    setPlaylists((prev) => [...prev, response]);
  };

  const findPlaylists = async (uid) => {
    const data = await findPlaylistsService(uid);
    setPlaylists(data);
  };

  const deletePlaylistById = async (playlist) => {
    setPlaylists((prev) => prev.filter((p) => p._id !== playlist._id));
    const updatedLikedObj = await deletePlaylist(playlist);
    // update likeSong
    dispatch(updateLikeSong(updatedLikedObj));
    // update playlistcnt of user
    dispatch(
      updateUserNonAdminThunk({
        _id: playlist.user,
        ...currentUser,
        playlistsCount: playlists.length - 1,
      })
    );
    // update comments of user
    setComments((prev) => prev.filter((p) => p.playlist !== playlist._id));
  };

  useEffect(() => {
    if (!currentUser && !uid) return;
    findPlaylists(uid ? uid : currentUser._id);
    setCurrentPage(1);
    // dispatch(findPlaylistsThunk(uid ? uid : currentUser._id));
  }, [uid]);

  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth > 750 ? 750 : window.innerWidth
  );

  const handleResize = () => {
    // setWindowWidth(window.innerWidth > 750 ? 750 : window.innerWidth);
    setPlaylistPerPage(
      window.innerWidth > 1630
        ? 4
        : window.innerWidth > 750
        ? 3
        : window.innerWidth > 559
        ? 2
        : 1
    );
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // let playlistPerPage = Math.floor(windowWidth / 250);
  let indexOfLastPlaylist = currentPage * playlistPerPage;
  let indexOfFirstPlaylist = indexOfLastPlaylist - playlistPerPage;

  return (
    <div className={`playlist-container me-0 position-relative`}>
      <h4 className={`text-white col`}>Playlists</h4>
      {show && (
        <>
          <div
            className={`col text-white position-absolute upgrade-title p-3 rounded-3 bg-primary fw-bold`}
          >
            Enjoy your Premium Journey!
            <div className={`text-white upgrade-text`}>
              Upgrade your account to create more playlists.
            </div>
            <div className={`mt-2`}>
              <button
                className={`btn not-now-btn float-end`}
                onClick={() => setShow(false)}
              >
                Not now
              </button>
              <button
                className={` login-btn rounded-pill float-end`}
                onClick={() => {
                  setShow(false);
                  navigate("/premium");
                }}
              >
                Upgrade
              </button>
            </div>
          </div>
        </>
      )}

      {(uid || currentUser) && playlists && (
        <div className={`mt-3 playlist-item-box`}>
          <Stack
            direction="row"
            sx={{ gap: { xl: "10px", lg: "20px", xs: "5px" } }}
            flexWrap="wrap"
            justifyContent="start"
            className={`ms-0 me-0`}
          >
            {!uid && (
              <div className={` d-flex align-items-start mt-5 add-icon`}>
                <BiAddToQueue
                  size={100}
                  className={`p-0`}
                  onClick={() => addPlaylist()}
                />
              </div>
            )}
            {playlists.length > 0 &&
              playlists
                .slice(indexOfFirstPlaylist, indexOfLastPlaylist)
                .map((item, idx) => (
                  <PlayListItem
                    key={idx + (currentPage - 1) * playlistPerPage}
                    playlist={item}
                    handleClick={handleClick}
                    deletePlaylist={deletePlaylistById}
                    isSelf={isSelf}
                  />
                ))}
            {playlists.length === 0 && (
              <div
                className={`no-playlist d-flex justify-content-center align-items-center`}
              >
                <h5>No Playlist yet...</h5>
              </div>
            )}
          </Stack>
          {playlists.length > 0 && (
            <div className={`mt-3 me-3`}>
              <Pagination
                color="warning"
                shape="rounded"
                defaultPage={1}
                count={Math.ceil(playlists.length / playlistPerPage)}
                page={currentPage}
                onChange={paginate}
                size="large"
                className={`pagination-style float-end p-0`}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#333",
                  },
                  "& .Mui-selected": {
                    color: "white",
                  },
                  "& .MuiPaginationItem-root:not(.Mui-selected)": {
                    color: "#ccc",
                  },
                  "& .MuiPaginationItem-icon": {
                    color: "gold",
                  },
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayList;
