import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Pagination from '../Pagination/Pagination';
import SpecificUser from "../SpecificUser";
import { useDispatch} from "react-redux";
import { findCurrentUserThunk } from "../../../services/users/users-thunks";
import { findCurrentUserSongsThunk } from "../../../services/thunks/like-thunk";
import {countAllUsers, deleteUser, fetchUsersByPagination, updateUser} from "../services";


const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    gender: "",
    isAdmin: false,
    isVip: false,
    isDeleted: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalCount = await countAllUsers();
        setTotalCount(totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsersByPagination(currentPage, usersPerPage);
        setUsers(users);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]:
        name === "isAdmin" || name === "isVip" ? Boolean(newValue) : newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(editingUser._id, formData);
      setUsers(
          users.map((user) =>
              user._id === editingUser._id ? updatedUser : user
          )
      );
      setEditingUser(null);
      setFormData({
        userName: "",
        email: "",
        gender: "",
        isAdmin: false,
        isVip: false,
        isDeleted: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      userName: user.userName,
      email: user.email,
      gender: user.gender,
      isAdmin: user.isAdmin,
      isVip: user.isVip,
      isDeleted: user.isDeleted,
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this user? It may lead to exceptions in the collection {follow}, so be careful !!"
    );
    if (confirmed) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
        setTotalCount(totalCount - 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({
      userName: "",
      email: "",
      gender: "",
      isAdmin: false,
      isVip: false,
      isDeleted: false,
    });
  };

  return (
    <div>
      <table className="table wd-white">
        <thead>
          <tr>
            <th className="d-none d-lg-table-cell">ID</th>
            <th>userName</th>
            <th className="d-none d-lg-table-cell">email</th>
            <th className="d-none d-md-table-cell">gender</th>
            <th>isAdmin</th>
            <th>isVip</th>
            <th>isDeleted</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="d-none d-lg-table-cell">{user._id}</td>
              <td>{user.userName}</td>
              <td className="d-none d-lg-table-cell">{user.email}</td>
              <td className="d-none d-md-table-cell">{user.gender}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>{user.isVip ? "Yes" : "No"}</td>
              <td>{user.isDeleted ? "Yes" : "No"}</td>
              <td>
                <button
                  onClick={() => handleEdit(user)}
                  className="btn btn-primary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <div className={`card my-4 ${editingUser ? "wd-edit-container" : ""}`}>
          <div className="card-header">Edit User</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="userName">userName:</label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  className="form-control"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <select
                  name="gender"
                  id="gender"
                  className="form-control"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-Binary</option>
                </select>
              </div>
              {/*<div className="form-group">*/}
              {/*    <label htmlFor="gender">gender:</label>*/}
              {/*    <input type="text" name="gender" id="gender" className="form-control" value={formData.gender} onChange={handleChange} />*/}
              {/*</div>*/}
              <div className="form-group">
                <label htmlFor="isAdmin">isAdmin:</label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  id="isAdmin"
                  className="form-check-input"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="isVip">isVip:</label>
                <input
                  type="checkbox"
                  name="isVip"
                  id="isVip"
                  className="form-check-input"
                  checked={formData.isVip}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="isDeleted">isDeleted:</label>
                <input
                  type="checkbox"
                  name="isDeleted"
                  id="isDeleted"
                  className="form-check-input"
                  checked={formData.isDeleted}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary float-end">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />

      <div className="mt-5"></div>
      <SpecificUser handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
};

export default UserTable;

