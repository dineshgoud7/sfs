import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GiveFeedback = () => {
    const [studentName, setStudentName] = useState('');
    const [courseName, setCourseName] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(1);
    const [facultyList, setFacultyList] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch list of faculty names from the backend
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-faculty'); // Backend endpoint
                setFacultyList(response.data);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
                alert('Failed to fetch faculty data');
            }
        };

        fetchFaculty();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!studentName || !courseName || !facultyName || !feedbackText || !rating) {
            setError('Please fill in all fields');
            return;
        }

        try {
            // Send feedback to the server
            const response = await axios.post('http://localhost:5000/feedback', {
                studentName,
                courseName,
                facultyName,
                feedbackText,
                rating,
            });

            // On success, show success message and clear the form
            setSuccessMessage('Feedback submitted successfully!');
            setError('');
            setStudentName('');
            setCourseName('');
            setFacultyName('');
            setFeedbackText('');
            setRating(1);
        } catch (err) {
            console.error('Error submitting feedback:', err);
            setError('Error submitting feedback. Please try again later.');
            setSuccessMessage('');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Give Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Student Name: </label>
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Course Name: </label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Faculty Name: </label>
                    <select
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                        style={styles.select}
                    >
                        <option value="">Select Faculty</option>
                        {facultyList.map((faculty) => (
                            <option key={faculty.id} value={faculty.name}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Feedback: </label>
                    <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        style={styles.textarea}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Rating: </label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        style={styles.select}
                    >
                        {[1, 2, 3, 4, 5].map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <button type="submit" style={styles.button}>
                        Submit Feedback
                    </button>
                </div>
            </form>

            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fontFamily: 'Arial, sans-serif',
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
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '1rem',
        transition: 'all 0.3s ease-in-out',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '1rem',
        resize: 'vertical',
        minHeight: '100px',
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
    buttonHover: {
        backgroundColor: '#2980b9',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    success: {
        color: 'green',
        textAlign: 'center',
        fontWeight: 'bold',
    },
};

export default GiveFeedback;
