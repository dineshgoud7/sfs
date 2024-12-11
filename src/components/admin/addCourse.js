import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [facultyList, setFacultyList] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [courseCode, setCourseCode] = useState('');

    // Fetch faculty data from the backend
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-faculty'); // Backend endpoint
                setFacultyList(response.data); // Assuming the data includes faculty_id and name
            } catch (error) {
                console.error('Error fetching faculty data:', error);
                alert('Failed to fetch faculty data');
            }
        };

        fetchFaculty();
    }, []);

    // Handle form submission
    // Ensure the courseName, courseDescription, courseCode, and selectedFaculty are correctly sent
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/add-course', {
            course_name: courseName, // course_name must match the column in the database
            course_description: courseDescription,
            course_code: courseCode,
            faculty_id: selectedFaculty, // Send the selected faculty_id from dropdown
        });
        alert(response.data.message || 'Course added successfully');
        // Reset form fields after submission
        setCourseName('');
        setCourseDescription('');
        setSelectedFaculty('');
        setCourseCode('');
    } catch (error) {
        console.error('Error adding course:', error);
        alert('Failed to add course');
    }
};


    return (
        <div>
            <h2>Add Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Name:</label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Course Description:</label>
                    <textarea
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Course Code:</label>
                    <input
                        type="text"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Assign Faculty:</label>
                    <select
                        value={selectedFaculty}
                        onChange={(e) => setSelectedFaculty(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            -- Select Faculty --
                        </option>
                        {facultyList.map((faculty) => (
                            <option key={faculty.faculty_id} value={faculty.faculty_id}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
