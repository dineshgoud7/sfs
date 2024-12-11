import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/courses');
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Available Courses</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Course ID</th>
                        <th style={styles.th}>Course Name</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td style={styles.td}>{course.id}</td>
                            <td style={styles.td}>{course.name}</td>
                            <td style={styles.td}>{course.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        border: '1px solid #ddd',
        padding: '10px',
        backgroundColor: '#f4f4f4',
    },
    td: {
        border: '1px solid #ddd',
        padding: '10px',
        textAlign: 'center',
    },
};

export default ViewCourses;
