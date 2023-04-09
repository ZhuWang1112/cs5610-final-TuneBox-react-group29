import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Pagination from './Pagination';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(3);
    const [totalCount, setTotalCount] = useState(0);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${usersPerPage}`);
            const data = await response.json();
            console.log(data);
            setUsers(data);
            // const totalCountResponse = await fetch('https://jsonplaceholder.typicode.com/users');
            // const totalCountData = await totalCountResponse.headers.get('X-Total-Count');
            setTotalCount(10);
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        setUsers(users.map((user) => (user.id === editingUser.id ? data : user)));
        setEditingUser(null);
        setFormData({
            name: '',
            email: '',
            phone: '',
            website: '',
        });
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            website: user.website,
        });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter((user) => user.id !== id));
            }
        }
    };

    const handleCancel = () => {
        setEditingUser(null);
        setFormData({
            name: '',
            email: '',
            phone: '',
            website: '',
        });
    };

    return (
        <div className="container">
            <table className="table wd-white">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Website</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.website}</td>
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
                                <label htmlFor="name">Name:</label>
                                <input type="text" name="name" id="name" className="form-control" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" name="phone" id="phone" className="form-control" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="website">Website:</label>
                                <input type="text" name="website" id="website" className="form-control" value={formData.website} onChange={handleChange} />
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

