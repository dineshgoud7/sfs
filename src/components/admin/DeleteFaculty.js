import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteFaculty = () => {
    const [facultyEmail, setFacultyEmail] = useState('');
    const [facultyList, setFacultyList] = useState([]);
    const [error, setError] = useState('');

    // Fetch the list of faculty emails from the backend
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-faculty'); // Backend endpoint
                setFacultyList(response.data);  // Assuming response.data is an array of faculty
            } catch (error) {
                console.error('Error fetching faculty list:', error);
                setError('Failed to fetch faculty list');
            }
        };

        fetchFaculty();
    }, []);

    const handleDelete = async (event) => {
        event.preventDefault();
        if (!facultyEmail) {
            setError('Please select a faculty to delete.');
            return;
        }

        try {
            const response = await axios.delete('http://localhost:5000/delete-faculty', {
                data: { facultyEmail },
            });
            alert(response.data);
            // Clear form field after deletion
            setFacultyEmail('');
        } catch (error) {
            console.error('Error deleting faculty:', error);
            alert('Failed to delete faculty');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Delete Faculty</h2>
            <form onSubmit={handleDelete}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Select Faculty Email: </label>
                    <select
                        value={facultyEmail}
                        onChange={(e) => setFacultyEmail(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Select Faculty</option>
                        {facultyList.map((faculty) => (
                            <option key={faculty.email} value={faculty.email}>
                                {faculty.name} ({faculty.email})
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <div style={styles.formGroup}>
                    <button type="submit" style={styles.button}>
                        Delete Faculty
                    </button>
                </div>
            </form>
        </div>
    );
};

// CSS styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '50px auto',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '20px',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        fontSize: '1.1rem',
        color: '#2c3e50',
        marginBottom: '8px',
        display: 'block',
    },
    select: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '1rem',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#3498db',
        color: 'white',
        fontSize: '1.2rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    error: {
        color: 'red',
        fontSize: '1rem',
        marginTop: '10px',
    },
};

export default DeleteFaculty;
