import React, { useState, useEffect } from "react";
import "./index.css";
import PlayListItem from "./PlayListItem";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  findPlaylistsThunk,
  createPlaylistThunk,
} from "../../services/thunks/playlist-thunk";
import {
  createPlaylist,
  deletePlaylist,
} from "../../reducers/playlist-reducer.js";

const PlayList = ({ isSelf }) => {
  const { uid } = useParams();
  const navigate = useNavigate();

  const { playlists } = useSelector((state) => state.playlist);
  console.log(playlists);
  const dispatch = useDispatch();
  const handleClick = (playlist_id) => {
    navigate(`/playlist/shutong/${playlist_id}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [playlistPerPage] = useState(3);
  const indexOfLastExercise = currentPage * playlistPerPage;
  const indexOfFirstExercise = indexOfLastExercise - playlistPerPage;
  const currentExercises = playlists.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  const addPlaylist = () => {
    const curPlaylist = playlists.length;
    const newName = `My Playlist ${curPlaylist + 1}`;
    // const newId = Date.now();
    const newPlaylist = {
      user: uid,
      playListName: newName,
      desc: "",
      songs: [],
      isDefault: false,
      img: "playlist-cover.jpeg",
    };
    dispatch(createPlaylistThunk(newPlaylist));
    // navigate(`/playlist/shutong/${newId}`);
  };

  const deletePlaylistById = (id) => {
    if (playlists.length === 1) {
      return;
    }

    dispatch(deletePlaylist(id));
  };

  useEffect(() => {
    dispatch(findPlaylistsThunk(uid));
    console.log("done");
  }, []);

  return (
    <div className={`playlist-container me-0`}>
      <h4 className={`text-white`}>Playlists</h4>

      <div className={`mt-3 playlist-item-box`}>
        <Stack
          direction="row"
          sx={{ gap: { lg: "20px", xs: "10px" } }}
          flexWrap="wrap"
          justifyContent="start"
          className={`ms-0 me-0`}
        >
          {isSelf && (
            <div className={` d-flex align-items-start mt-5 add-icon`}>
              <BiAddToQueue
                size={100}
                className={`p-0`}
                onClick={() => addPlaylist()}
              />
            </div>
          )}
          {playlists.length > 0 &&
            currentExercises.map((item, idx) => (
              <PlayListItem
                key={idx + (currentPage - 1) * playlistPerPage}
                playlist={item}
                handleClick={handleClick}
                deletePlaylist={deletePlaylistById}
                isSelf={isSelf}
              />
            ))}
        </Stack>
        <div className={`me-3`}>
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
      </div>
    </div>
  );
};

export default PlayList;
