import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios: npm install axios

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            if (response.data.success) {
                const role = response.data.role;
                if (role === 'admin') navigate('/admin');
                else if (role === 'student') navigate('/student');
                else if (role === 'faculty') navigate('/faculty');
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in');
        }
    };

    const handleForgotPassword = () => {
        // Navigate to a password reset page or show a password reset modal
        navigate('/forgot-password'); // Example route for the forgot password page
    };

    const styles = {
        container: {
            maxWidth: '400px',
            margin: '50px auto',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fontFamily: 'Arial, sans-serif',
        },
        formGroup: {
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            boxSizing: 'border-box',
        },
        button: {
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
        },
        forgotPassword: {
            display: 'block',
            marginTop: '10px',
            fontSize: '14px',
            color: '#007',
            textAlign: 'center',
            textDecoration: 'none',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    Login
                </button>
            </form>
            <a
                href="#"
                style={styles.forgotPassword}
                onClick={handleForgotPassword}
            >
                Forgot Password?
            </a>
        </div>
    );
};

export default Login;
