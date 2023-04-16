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
import {
  findPlaylistsThunk,
  createPlaylistThunk,
  deletePlaylistThunk,
} from "../../services/thunks/playlist-thunk";
import {
  createPlaylist,
  // deletePlaylist,
} from "../../reducers/playlist-reducer.js";
import { updateProfileSongs } from "../../reducers/like-reducer";
const PlayList = ({ isSelf }) => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { profileSongs } = useSelector((state) => state.likedSong);
  const [playlists, setPlaylists] = useState(null);
  // const { playlists } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();
  const handleClick = (playlist_id) => {
    navigate(`/details/playlist/${playlist_id}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  // const [playlistPerPage] = useState(3);
  // const indexOfLastPlaylist = currentPage * playlistPerPage;
  // const indexOfFirstPlaylist = indexOfLastPlaylist - playlistPerPage;
  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const addPlaylist = () => {
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
    dispatch(
      createPlaylistThunk({ playlist: newPlaylist, cnt: curPlaylist + 1 })
    ).then((res) => setPlaylists((prev) => [...prev, res.payload]));
  };
  const findPlaylists = async (uid) => {
    const data = await findPlaylistsService(uid);
    console.log("playlist in profile", data);
    setPlaylists(data);
  };
  const deletePlaylistById = async (playlist) => {
    setPlaylists((prev) => prev.filter((p) => p._id !== playlist._id));
    const updatedLikedObj = await deletePlaylist(playlist);
    console.log("updatedLiked", updatedLikedObj);
    // update profileSong
    dispatch(updateProfileSongs(updatedLikedObj.likedSongs));
    // UPDATE LIKLEDSONG
  };

  useEffect(() => {
    if (!currentUser && !uid) return;
    findPlaylists(uid ? uid : currentUser._id);
    // dispatch(findPlaylistsThunk(uid ? uid : currentUser._id));
  }, [uid]);

  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth > 750 ? 750 : window.innerWidth
  );

  const handleResize = () => {
    setWindowWidth(window.innerWidth > 750 ? 750 : window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let playlistPerPage = Math.floor(windowWidth / 250);
  console.log("windowWidth: ", windowWidth);
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
