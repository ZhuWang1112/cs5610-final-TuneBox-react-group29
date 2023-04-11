import React, { useState } from 'react';
import axios from 'axios';
import {Form, Button, Col, Row} from "react-bootstrap";
const API_BASE = 'http://localhost:4000/api';

function SpecificUser({handleEdit, handleDelete}) {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${API_BASE}/users/admin/name/${username}`);
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSearch} style={{width:'50%'}}>
                <Row>
                    <Col xs={8}>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(event) => setUsername(event.target.value)} />
                    </Col>
                    <Col xs={4}>
                        <Button variant="primary" type="submit">Search</Button>
                    </Col>
                </Row>
            </Form>
            {user && (
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
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SpecificUser;
