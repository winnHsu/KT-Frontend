import React from 'react';
import './HomePage.css'
import TextButton from '../../components/buttons/TextButton';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/items');
    };

    return (
        <div className="homeContainer page-enter">
            <p>Welcome to Kaizntree</p>
            <TextButton onClick={handleButtonClick} text='GET STARTED' backgroundColor='#F5F5F5' color='#1E1E1E' />
        </div>
    );
}
