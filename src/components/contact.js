// src/components/Contact.js
import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Logic for handling contact form submission
        console.log('Contact Message:', { name, email, phone, subject, message });

        // Show success message
        setSubmitted(true);

        // Reset form fields
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
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
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        textarea: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            minHeight: '100px',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        successMessage: {
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '4px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Contact Us</h2>
            {submitted && (
                <div style={styles.successMessage}>
                    Thank you for reaching out! We will get back to you soon.
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
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
                    <label style={styles.label}>Phone (optional):</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Message:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>
                <button type="submit" style={styles.button}>
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;