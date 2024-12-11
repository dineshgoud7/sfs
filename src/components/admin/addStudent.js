import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStudent = () => {
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentCourse, setStudentCourse] = useState('');
    const [facultyList, setFacultyList] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');

    // Fetch faculty list from backend
    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const response = await axios.get('http://localhost:5000/faculty');
                setFacultyList(response.data); // Assuming the API returns an array of faculties
            } catch (error) {
                console.error('Error fetching faculties:', error);
            }
        };
        fetchFaculties();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/add-student', {
                studentName,
                studentEmail,
                studentCourse,
            });
            alert(response.data);
            // Clear form fields after submission
            setStudentName('');
            setStudentEmail('');
            setStudentCourse('');
        } catch (error) {
            console.error('Error adding student:', error);
            alert('Failed to add student');
        }
    };

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '50px auto',
            padding: '40px',
            borderRadius: '8px',
            backgroundColor: '007BFF',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        },
        heading: {
            textAlign: 'center',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '30px',
        },
        formGroup: {
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontSize: '16px',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.3s ease',
        },
        inputFocus: {
            borderColor: '#007BFF',
        },
        button: {
            width: '100%',
            padding: '14px',
            fontSize: '18px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        message: {
            textAlign: 'center',
            fontSize: '14px',
            color: '#333',
            marginTop: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Student Name:</label>
                    <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Student Email:</label>
                    <input
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Student Course:</label>
                    <input
                        type="text"
                        value={studentCourse}
                        onChange={(e) => setStudentCourse(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>

                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Add Student
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
