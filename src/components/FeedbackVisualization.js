import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

// Register the required chart components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const FeedbackVisualization = () => {
    const [facultyName, setFacultyName] = useState('');
    const [facultyList, setFacultyList] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch faculty data
        const fetchFaculty = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-faculty');
                setFacultyList(response.data);
            } catch (error) {
                console.error('Error fetching faculty data:', error);
                alert('Failed to fetch faculty data.');
            }
        };

        fetchFaculty();
    }, []);

    // Function to fetch feedback data
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

    // Prepare data for Pie chart
    const feedbackRatings = feedbacks.reduce(
        (acc, feedback) => {
            acc[feedback.rating - 1] += 1; // Assuming ratings range from 1-5
            return acc;
        },
        [0, 0, 0, 0, 0] // Initialize the array for each rating (1-5)
    );

    const data = {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [
            {
                label: 'Faculty Feedback Ratings',
                data: feedbackRatings,
                backgroundColor: ['#FF5733', '#FF8C00', '#FFCD00', '#33FF57', '#3357FF'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>View Feedback - Pie Chart</h2>
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
                <div style={{ maxWidth: '300px', margin: '0 auto' }}> {/* Adjust size of the chart */}
                    <Pie data={data} width={200} height={200} /> {/* Set smaller size */}
                </div>
            )}
        </div>
    );
};

export default FeedbackVisualization;
