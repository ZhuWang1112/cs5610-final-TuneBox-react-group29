import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Pagination from './Pagination';
const API_BASE = 'http://localhost:4000/api';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        gender: '',
        isAdmin: false,
        isVip: false,
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`${API_BASE}/users/all/pagination?page=${currentPage}&limit=${usersPerPage}`);
            const data = await response.json();
            console.log(data);
            setUsers(data);
            // const totalCountResponse = await fetch('https://jsonplaceholder.typicode.com/users');
            // const totalCountData = await totalCountResponse.headers.get('X-Total-Count');
            setTotalCount(14);
            // console.log(totalCountResponse);
        };
        fetchUsers();
    }, [currentPage, usersPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // const indexOfLastUser = currentPage * usersPerPage;
    // const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: name === 'isAdmin' || name === 'isVip' ? Boolean(newValue) : newValue,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_BASE}/users/${editingUser._id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        console.log(data);
        setUsers(users.map((user) => (user._id === editingUser._id ? data : user)));
        setEditingUser(null);
        setFormData({
            userName: '',
            email: '',
            gender: '',
            isAdmin: false,
            isVip: false,
        });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            userName: user.userName,
            email: user.email,
            gender: user.gender,
            isAdmin: user.isAdmin,
            isVip: user.isVip,
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            const response = await fetch(`${API_BASE}/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter((user) => user._id !== id));
            }
        }
    };

    const handleCancel = () => {
        setEditingUser(null);
        setFormData({
            userName: '',
            email: '',
            gender: '',
            isAdmin: false,
            isVip: false,
        });
    };

    return (
        <div>
            <table className="table wd-white">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>userName</th>
                    <th>email</th>
                    <th>gender</th>
                    <th>isAdmin</th>
                    <th>isVip</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.userName}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                        <td>{user.isVip ? 'Yes' : 'No'}</td>
                        <td>
                            <button onClick={() => handleEdit(user)} className="btn btn-primary mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(user.id)} className="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {editingUser && (
                <div className={`card my-4 ${editingUser ? 'wd-edit-container' : ''}`}>
                    <div className="card-header">Edit User</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="userName">userName:</label>
                                <input type="text" name="userName" id="userName" className="form-control" value={formData.userName} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="gender">gender:</label>
                                <input type="text" name="gender" id="gender" className="form-control" value={formData.gender} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="isAdmin">isAdmin:</label>
                                <input type="checkbox" name="isAdmin" id="isAdmin" className="form-check-input" checked={formData.isAdmin} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="isVip">isVip:</label>
                                <input type="checkbox" name="isVip" id="isVip" className="form-check-input" checked={formData.isVip} onChange={handleChange} />
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary float-end">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Pagination currentPage={currentPage} usersPerPage={usersPerPage} totalCount={totalCount} onPageChange={handlePageChange} />

        </div>
    );
};

export default UserTable;

