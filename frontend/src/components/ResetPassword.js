// ResetPassword.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RequestPasswordReset.css';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const { oldPassword, newPassword, confirmPassword } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Password has been reset successfully');
                alert("Password has been reset successfully.");
                
                navigate('/');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="reset-password-container">
            <form className="reset-password-form" onSubmit={onSubmit}>
                <h2 className="reset-password-title">Reset Password</h2>
                <div className="input-container">
                    <label>Old Password:</label>
                    <input type="password" name="oldPassword" value={oldPassword} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>New Password:</label>
                    <input type="password" name="newPassword" value={newPassword} onChange={onChange} required minLength="8" />
                </div>
                <div className="input-container">
                    <label>Confirm New Password:</label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required minLength="8" />
                </div>
                <button className="reset-password-button" type="submit">Reset Password</button>
                {message && <p className="reset-password-message">{message}</p>}
            </form>
           
        </div>
    );
};

export default ResetPassword;
