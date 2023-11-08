// src/Users.tsx

import React, {useEffect} from 'react';

const Users: React.FC = () => {
    // TODO: Implement users display logic

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('--->>>token: ', token);
        fetch('http://localhost:3000/users', {
            headers: {
                'Authorization': `${token}`,
            },
        }).then(res => res.json()).then(res=> console.log(res))

    }, [])

    return (
        <div>
            <h1>Users</h1>
            {/* List users here */}
        </div>
    );
};

export default Users;
