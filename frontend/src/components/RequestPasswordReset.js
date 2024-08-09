// RequestPasswordReset.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestPasswordReset.css';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const storedEmail = localStorage.getItem('email');

    const onSubmit = async e => {
        e.preventDefault();

        if (email !== storedEmail) {
            setMessage('The email address does not match our records.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Password reset link has been sent to your email.');
                alert("Password reset link has been sent to your email.");
                navigate('/');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };
    const goback = () => {
        navigate('/bookList');
    };
    return (
        <div className="request-reset-container">
            <form className="request-reset-form" onSubmit={onSubmit}>
                <h2 className="request-reset-title">Request Password Reset</h2>
                <div className="input-container">
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <button className="request-reset-button" type="submit">Send Reset Link</button>
                {message && <p className="request-reset-message">{message}</p>}
            </form>
            <button className="add-book-button" onClick={goback}>
                →
            </button>
        </div>
    );
};

export default RequestPasswordReset;
