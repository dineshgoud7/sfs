// src/components/Admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import AdminDashboard.css for specific styling

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="admin-links">
                <Link to="/admin/add-student">Add Student</Link>
                <Link to="/admin/add-faculty">Add Faculty</Link>
                <Link to="/admin/delete-faculty">Delete Faculty</Link>

                <Link to="/admin/add-course">Add Course</Link>
                <Link to="/admin/view-students">View Students</Link> {/* New link */}
                <Link to="/admin/view-faculty">View Faculty</Link>   {/* New link */}
                <Link to="/admin/feedback-visualization">View Feedback Visualization</Link>


            </div>
        </div>
    );
}

export default AdminDashboard;
