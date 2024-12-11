import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/forgot-password', { email });
            if (response.data.success) {
                setIsOtpSent(true);
                setMessage('OTP sent to your email!');
            } else {
                setMessage('Email not found. Please check and try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setMessage('Error sending OTP. Please try again later.');
        }
    };

    const handleOtpSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
            if (response.data.success) {
                setMessage('OTP verified successfully. You can now reset your password.');
                setTimeout(() => navigate('/reset-password'), 5000); // Redirect to reset password page
            } else {
                setMessage('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setMessage('Error verifying OTP. Please try again later.');
        }
    };

    const styles = {
        container: {
            maxWidth: '500px',
            margin: '50px auto',
            padding: '40px',
            borderRadius: '8px',
            backgroundColor: '#fff',
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
            <h2 style={styles.heading}>Forgot Password</h2>
            {!isOtpSent ? (
                <form onSubmit={handleEmailSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Enter your email address:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        Send OTP
                    </button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Enter the OTP sent to your email:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
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
                        Verify OTP
                    </button>
                </form>
            )}
            {message && <div style={styles.message}>{message}</div>}
        </div>
    );
};

export default ForgotPassword;
