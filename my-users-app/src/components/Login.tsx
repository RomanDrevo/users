import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginCredentials {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<LoginCredentials>({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('--->>>credentials: ', credentials)

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('--->>>data: ', data)
                localStorage.setItem('token', data.token);
                // Perform operations with the response data if necessary
                // Redirect to the users page
                navigate('/users');
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error (show message to the user, etc.)
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
