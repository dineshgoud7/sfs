import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewFeedback = () => {
    const [facultyName, setFacultyName] = useState('');
    const [facultyList, setFacultyList] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-faculty'); // Replace with your backend endpoint
                setFacultyList(response.data);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
                alert('Failed to fetch faculty data.');
            }
        };

        fetchFaculty();
    }, []);

    const fetchFeedback = async () => {
        if (!facultyName) {
            setError('Please select a faculty.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/feedback/${facultyName}`);
            setFeedbacks(response.data);
            setError('');
        } catch (err) {
            console.error('Error fetching feedback:', err);
            setError('Error fetching feedback. Please try again later.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>View Feedback</h2>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Faculty Name:</label>
                <select
                    value={facultyName}
                    onChange={(e) => setFacultyName(e.target.value)}
                    style={{
                        padding: '8px',
                        marginRight: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                >
                    <option value="">Select Faculty</option>
                    {facultyList.map((faculty) => (
                        <option key={faculty.id} value={faculty.name}>
                            {faculty.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={fetchFeedback}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Search
                </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {feedbacks.length === 0 ? (
                <p>No feedback available for the selected faculty.</p>
            ) : (
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginTop: '20px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
                            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Student Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Course Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Faculty Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Feedback</th>
                            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.id} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '12px' }}>{feedback.studentName}</td>
                                <td style={{ padding: '12px' }}>{feedback.courseName}</td>
                                <td style={{ padding: '12px' }}>{feedback.facultyName}</td>
                                <td style={{ padding: '12px' }}>{feedback.feedbackText}</td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <div
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '50%',
                                            background: `conic-gradient(
                                                #4caf50 ${feedback.rating * 20}%,
                                                #ccc ${feedback.rating * 20}% 100%
                                            )`,
                                            display: 'inline-block',
                                            lineHeight: '50px',
                                            textAlign: 'center',
                                            color: '#000',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {feedback.rating * 20}%
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewFeedback;
