import React, { useState } from "react";
import "./index.css";
import PlayListItem from "./PlayListItem";
import { Box, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from "react-router";

const PlayList = () => {
  const navigate = useNavigate();
  const data = [
    { _id: 1, name: "Default playlist", song: 0 },
    { _id: 2, name: "playlist2", song: 1 },
    { _id: 3, name: "playlist3", song: 2 },
    // { _id: 3, name: "playlist3", song: 2 },
    // { _id: 3, name: "playlist3", song: 2 },
    // { _id: 3, name: "playlist3", song: 2 },
    // { _id: 3, name: "playlist3", song: 2 },
    // { _id: 3, name: "playlist3", song: 2 },
    // { _id: 3, name: "playlist3", song: 2 },
  ];
  const handleClick = (playlist_name) => {
    console.log("clicked");
    navigate(`/playlist/shutong/${playlist_name}`);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [playlistPerPage] = useState(3);
  const indexOfLastExercise = currentPage * playlistPerPage;
  const indexOfFirstExercise = indexOfLastExercise - playlistPerPage;
  const currentExercises = data.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };
  return (
    <div className={`playlist-container`}>
      <h4 className={`text-white`}>Playlists</h4>

      <div className={`mt-3 playlist-item-box`}>
        <Stack
          direction="row"
          sx={{ gap: { lg: "20px", xs: "10px" } }}
          flexWrap="wrap"
          justifyContent="start"
          className={`ms-0 me-0`}
        >
          <div className={`d-flex align-items-start mt-5 text-muted`}>
            <BiAddToQueue size={100} />
          </div>

          {currentExercises.map((item, idx) => (
            <PlayListItem
              key={idx + (currentPage - 1) * playlistPerPage}
              playlist={item}
              handleClick={handleClick}
            />
          ))}
        </Stack>
        <div className={`me-3`}>
          <Pagination
            color="warning"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(data.length / playlistPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
            className={`pagination-style float-end`}
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
