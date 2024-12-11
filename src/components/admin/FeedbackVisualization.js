import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Import Bar chart
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register the required chart components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const FeedbackVisualization = () => {
    const [facultyList, setFacultyList] = useState([]);
    const [facultyFeedbacks, setFacultyFeedbacks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch faculty data
        const fetchFaculty = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-faculty');
                setFacultyList(response.data);

                // Fetch feedback for each faculty
                const feedbackResponses = await Promise.all(
                    response.data.map((faculty) =>
                        axios.get(`http://localhost:5000/feedback/${faculty.name}`)
                    )
                );

                setFacultyFeedbacks(feedbackResponses.map((res) => res.data));
            } catch (error) {
                console.error('Error fetching faculty or feedback data:', error);
                setError('Failed to fetch faculty or feedback data.');
            }
        };

        fetchFaculty();
    }, []);

    // Prepare data for Bar chart for each faculty
    const prepareDataForFaculty = (feedbacks) => {
        const feedbackRatings = feedbacks.reduce(
            (acc, feedback) => {
                acc[feedback.rating - 1] += 1; // Assuming ratings range from 1-5
                return acc;
            },
            [0, 0, 0, 0, 0] // Initialize the array for each rating (1-5)
        );

        // Count the number of unique users (assuming each feedback has a unique student name)
        const uniqueUsers = new Set(feedbacks.map(feedback => feedback.studentName));
        const userCount = uniqueUsers.size;

        return {
            ratingsData: {
                labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
                datasets: [
                    {
                        label: 'Faculty Feedback Ratings',
                        data: feedbackRatings,
                        backgroundColor: [
                            '#FF5733',  // Red for 1 Star
                            '#FF8C00',  // Orange for 2 Stars
                            '#FFCD00',  // Yellow-Orange for 3 Stars
                            '#A4D300',  // Light Green for 4 Stars
                            '#33FF57',  // Full Green for 5 Stars
                        ],
                        borderColor: '#fff',
                        borderWidth: 1,
                    },
                ],
            },
            userCount,
        };
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Feedback Visualization - Bar Graph</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {facultyList.length === 0 ? (
                <p>Loading faculty data...</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {facultyList.map((faculty, index) => {
                        const { ratingsData, userCount } = prepareDataForFaculty(facultyFeedbacks[index] || []);

                        return (
                            <div
                                key={faculty.id}
                                style={{
                                    width: '300px',
                                    margin: '20px',
                                    textAlign: 'center',
                                    border: '1px solid #ddd',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <h3>{faculty.name}</h3>
                                {facultyFeedbacks[index] && facultyFeedbacks[index].length > 0 ? (
                                    <>
                                        <Bar
                                            data={ratingsData}
                                            options={options}
                                            width={300}
                                            height={200}
                                        />
                                        <p style={{ marginTop: '10px' }}>
                                            {userCount} users have provided feedback.
                                        </p>
                                    </>
                                ) : (
                                    <p>No feedback available for this faculty.</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default FeedbackVisualization;
