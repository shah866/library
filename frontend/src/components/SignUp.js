import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user' // Default role
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const { firstName, lastName, email, password, role } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, password, role })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Registration successful');
                alert("User Registration Successful. An email has been sent to your account. Please verify it.");
                navigate('/');
            } else {
                setMessage(data.message.join(', '));
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={onSubmit}>
                <h2 className="title">Sign Up</h2>
                <div className="input-container">
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={firstName} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={lastName} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={onChange} required minLength="8" />
                </div>
                <div className="input-container">
                    <label>Role:</label>
                    <select name="role" value={role} onChange={onChange} required>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button className="buttonn" type="submit">Sign Up</button>
                <p>Already Have an Account? <Link to="/">Sign In</Link></p>
                {message && <p className={`message ${message === 'Registration successful' ? 'success' : 'error'}`}>{message}</p>}
            </form>
        </div>
    );
};

export default SignUp;
