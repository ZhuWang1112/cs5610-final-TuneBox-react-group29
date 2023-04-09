import React, { useState } from 'react';
import axios from 'axios';

function Specific() {
    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:4000/api/users/${username}`);
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                <button type="submit">Search</button>
            </form>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Age: {user.age}</p>
                </div>
            )}
        </div>
    );
}

export default Specific;
