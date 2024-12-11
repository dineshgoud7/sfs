import React, { useState } from 'react';
import axios from 'axios';

const AddFaculty = () => {
    const [facultyName, setFacultyName] = useState('');
    const [facultyEmail, setFacultyEmail] = useState('');
    const [facultyDepartment, setFacultyDepartment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/add-faculty', {
                facultyName,
                facultyEmail,
                facultyDepartment,
            });
            alert(response.data);
            // Clear form fields after submission
            setFacultyName('');
            setFacultyEmail('');
            setFacultyDepartment('');
        } catch (error) {
            console.error('Error adding faculty:', error);
            alert('Failed to add faculty');
        }
    };

    return (
        <div>
            <h2>Add Faculty</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Faculty Name:</label>
                    <input
                        type="text"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Faculty Email:</label>
                    <input
                        type="email"
                        value={facultyEmail}
                        onChange={(e) => setFacultyEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Faculty Department:</label>
                    <input
                        type="text"
                        value={facultyDepartment}
                        onChange={(e) => setFacultyDepartment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Faculty</button>
            </form>
        </div>
    );
};

export default AddFaculty;
