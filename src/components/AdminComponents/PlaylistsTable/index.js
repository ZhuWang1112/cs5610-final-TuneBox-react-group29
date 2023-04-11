import React, {useEffect, useState} from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import './index.css';
const API_BASE = 'http://localhost:4000/api';
const PlaylistsTable = () => {
    const [playlists, setPlaylists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [usersPerPage, setUsersPerPage] = useState(5);


    useEffect(() => {
        axios.get(`${API_BASE}/playlists/admin/count`)
            .then(response => {
                setTotalCount(response.data);
            }).catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        axios.get(`${API_BASE}/playlists/admin/pagination?page=${currentPage}&limit=${usersPerPage}`)
            .then(response => {
                setPlaylists(response.data);
            }).catch(error => {
            console.error(error);
        });
    }, [currentPage, usersPerPage]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this playlist?');
        if (confirmed) {
            await axios.delete(`${API_BASE}/playlists/admin/${id}`)
                .then(setPlaylists(playlists.filter((playlist) => playlist._id !== id)))
                .catch(error => {
                    console.error(error);
                });
            setTotalCount(totalCount - 1);
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
                            <th scope="col">Description</th>
                            <th scope="col">Creator</th>
                            <th scope="col">Songs</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {playlists.map(playlist => {
                            return (
                                <tr key={playlist._id}>
                                    <td>{playlist.playListName}</td>
                                    <td>{playlist.description}</td>
                                    <td>{playlist.user.userName}</td>
                                    <td>{playlist.songs.length}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(playlist._id)}>
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
            <Pagination currentPage={currentPage} usersPerPage={usersPerPage} totalCount={totalCount} onPageChange={handlePageChange} />
        </div>
    );
}
export default PlaylistsTable;