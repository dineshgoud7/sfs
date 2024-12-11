import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseFeedbackForm = () => {
    const [formData, setFormData] = useState({
        courseName: '',
        studentName: '',
        courseContent: 0,
        teachingMethod: 0,
        assessmentClarity: 0,
        overallExperience: 0,
        comments: '',
    });
    const [courses, setCourses] = useState([]); // Define courses state
    const [message, setMessage] = useState('');

    // Fetch courses on component mount
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/courses'); // Replace with your backend endpoint
                setCourses(response.data); // Set courses to state
            } catch (error) {
                console.error('Error fetching courses:', error);
                alert('Failed to load courses. Please try again.');
            }
        };

        fetchCourses();
    }, []); // Empty dependency array to run only once

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/submit-course-feedback', formData);
            setMessage('Feedback submitted successfully!');
            setFormData({
                courseName: '',
                studentName: '',
                courseContent: 0,
                teachingMethod: 0,
                assessmentClarity: 0,
                overallExperience: 0,
                comments: '',
            });
        } catch (error) {
            console.error('Error submitting feedback:', error);
            setMessage('Failed to submit feedback. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Course Feedback Form</h2>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Course Name:</label>
                    <select
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            marginTop: '5px',
                            borderRadius: '4px',
                        }}
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.name}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Student Name:</label>
                    <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Rate Course Content (1-5):</label>
                    <input
                        type="number"
                        name="courseContent"
                        value={formData.courseContent}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Rate Teaching Method (1-5):</label>
                    <input
                        type="number"
                        name="teachingMethod"
                        value={formData.teachingMethod}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Rate Assessment Clarity (1-5):</label>
                    <input
                        type="number"
                        name="assessmentClarity"
                        value={formData.assessmentClarity}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Overall Experience (1-5):</label>
                    <input
                        type="number"
                        name="overallExperience"
                        value={formData.overallExperience}
                        onChange={handleChange}
                        min="1"
                        max="5"
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Additional Comments:</label>
                    <textarea
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            height: '100px',
                            padding: '10px',
                            marginTop: '5px',
                            borderRadius: '4px',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default CourseFeedbackForm;
