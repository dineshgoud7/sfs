// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // Ensure you have the CSS file for styling

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Welcome to the Student Feedback System</h1>
                <p>Your feedback matters! Join us in improving the educational experience.</p>
                
            </div>
        </div>
    );
};

export default Home;
