import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateFaculty = () => {
    const { id } = useParams(); // Get faculty ID from the route
    const navigate = useNavigate();

    const [faculty, setFaculty] = useState({
        name: '',
        email: '',
        department: '',
    });

    const [loading, setLoading] = useState(true);

    // Fetch the faculty details on component load
    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/faculty/${id}`);
                setFaculty(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching faculty details:', error);
                alert('Failed to fetch faculty details');
                navigate('/admin'); // Redirect to admin page if error occurs
            }
        };
        fetchFaculty();
    }, [id, navigate]);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:5000/faculty/${id}`, faculty);
            alert('Faculty updated successfully');
            navigate('/admin'); // Redirect to admin panel after update
        } catch (error) {
            console.error('Error updating faculty:', error);
            alert('Failed to update faculty');
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setFaculty({
            ...faculty,
            [e.target.name]: e.target.value,
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Update Faculty</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={faculty.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={faculty.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={faculty.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Faculty</button>
            </form>
        </div>
    );
};

export default UpdateFaculty;
