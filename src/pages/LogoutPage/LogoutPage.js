import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import TextButton from '../../components/buttons/TextButton';
import './LogoutPage.css';

export default function LogoutPage() {
    const { logout } = useAuth(); // Use the logout function from the AuthContext
    const navigate = useNavigate(); // Hook for navigation

    const handleButtonClick = () => {
        logout(); // Call logout when the button is clicked
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="logoutContainer page-enter">
            <p>Are you sure you want to log out?</p>
            <TextButton onClick={handleButtonClick} text='LOG OUT' backgroundColor='#F5F5F5' color='#1E1E1E' />
        </div>
    );
}
