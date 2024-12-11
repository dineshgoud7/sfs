import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed (npm install axios)
import './ViewFaculty.css'; // Import CSS for styling

const ViewFaculty = () => {
    const [faculty, setFaculty] = useState([]);

    // Fetch faculty data from the backend
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-faculty'); // Update with your API endpoint
                setFaculty(response.data);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
                alert('Failed to fetch faculty data');
            }
        };

        fetchFaculty();
    }, []);

    return (
        <div className="view-faculty">
            <h2>View Faculty</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {faculty.length > 0 ? (
                        faculty.map((member) => (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>{member.department}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No faculty data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewFaculty;
