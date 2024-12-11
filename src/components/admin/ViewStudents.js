import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed (npm install axios)
import './ViewStudents.css'; // Import CSS for styling

const ViewStudents = () => {
    const [students, setStudents] = useState([]);

    // Fetch student data from the backend
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-students'); // Update with your API endpoint
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
                alert('Failed to fetch student data');
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="view-students">
            <h2>View Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No student data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewStudents;
