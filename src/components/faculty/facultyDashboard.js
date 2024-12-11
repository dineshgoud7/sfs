// src/components/Faculty/FacultyDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './FacultyDashboard.css'; // Import FacultyDashboard.css for specific styling

const FacultyDashboard = () => {
    return (
        <div className="faculty-dashboard">
            <h2>Faculty Dashboard</h2>
            <div className="faculty-links">
                <Link to="/faculty/view-feedback">View Feedback</Link>
                <Link to="/faculty/manage-courses">Manage Courses</Link>
            </div>
        </div>
    );
}

export default FacultyDashboard;
