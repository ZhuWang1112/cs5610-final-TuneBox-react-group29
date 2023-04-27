import React, {useEffect, useState} from "react";
import Pagination from "../Pagination/Pagination";
import './index.css';
import { useDispatch } from "react-redux";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk";
import {countPlaylists, deletePlaylist, fetchPlaylistsByPagination} from "../services";
const PlaylistsTable = () => {
  const [playlists, setPlaylists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const dispatch = useDispatch();
  useEffect(() => {

    const fetchData = async () => {
      const playlistsNum = await countPlaylists();
        setTotalCount(playlistsNum);
    };
    fetchData();
  }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const playlists = await fetchPlaylistsByPagination(currentPage, usersPerPage);
      setPlaylists(playlists);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, [currentPage, usersPerPage]);

  useEffect(() => {
    dispatch(findCurrentUserThunk());
    dispatch(findCurrentUserSongsThunk());
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this playlist?"
    );
    if (confirmed) {
      try {
        await deletePlaylist(id);
        setPlaylists(playlists.filter((playlist) => playlist._id !== id));
        setTotalCount(totalCount - 1);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <table className="table wd-white">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col" className="d-none d-lg-table-cell">
                  Description
                </th>
                <th scope="col">Creator</th>
                <th scope="col">Songs</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist) => {
                return (
                  <tr key={playlist._id}>
                    <td>{playlist.playListName}</td>
                    <td className="d-none d-lg-table-cell">
                      {playlist.description}
                    </td>
                    <td>{playlist.user.userName}</td>
                    <td>{playlist.songs.length}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(playlist._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default PlaylistsTable;