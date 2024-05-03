import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import TextButton from '../../components/buttons/TextButton';
import './UserAuthentication.css'

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username,
                password
            });
            if (response.data.access && response.data.refresh) {
                login(response.data.access, response.data.refresh);
                navigate('/');
            } else {
                throw new Error("Missing tokens in response");
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed! Check your credentials and try again.');
        }
    };


    return (
        <form onSubmit={handleLogin} className="login-container">
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <TextButton text='Forgot Account' backgroundColor='#F5F5F5' color='#1E1E1E' onClick={() => navigate('/reset-password')} />
            <TextButton text='Create Account' backgroundColor='#F5F5F5' color='#1E1E1E' onClick={() => navigate('/registration')} />
            <TextButton text='Login' backgroundColor='#4CAF50' color='#FFFFFF' onClick={handleLogin} />
        </form>
    );
}

export default LoginPage;