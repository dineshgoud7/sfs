// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional for styling

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/register">Registration</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
