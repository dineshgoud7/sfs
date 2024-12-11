import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const navigate = useNavigate(); // Hook for navigation
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user session data

    useEffect(() => {
        // Check if the user is logged in
        if (!user) {
            console.log('No session found. Redirecting to login...');
            navigate('/student'); // Redirect to login if no session
        }
    }, [navigate, user]);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear session
        navigate('/login'); // Redirect to login
    };

    return (
        <div className="student-dashboard">
            <h2>Student Dashboard</h2>
            <div className="student-links">
                <Link to="/student/give-feedback">Give Feedback</Link>
                <Link to="/student/view-feedback">View Feedback</Link>
                <Link to="/student/courses">View Courses</Link>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default StudentDashboard;
