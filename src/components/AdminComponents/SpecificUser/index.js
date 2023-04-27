import React, { useState } from 'react';
import {Form, Button, Col, Row} from "react-bootstrap";
import {searchUsersByPartialName} from "../services";

function SpecificUser({handleEdit, handleDelete}) {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const users = await searchUsersByPartialName(username);
            setUsers(users);
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
            {users && (
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
                                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                <td>{user.isVip ? 'Yes' : 'No'}</td>
                                <td>{user.isDeleted ? "Yes" : "No"}</td>
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
            )}
        </div>
    );
}

export default SpecificUser;
