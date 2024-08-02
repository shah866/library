import React, { useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';

import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const { firstName, lastName, email, password } = formData;

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
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Registration successful');
                alert("User Registration Successful , An email sent to your account please vertify it ");
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
                <button className="button" type="submit">Sign Up</button>
                <p> Already Have Account? <Link to="/" >SignIn</Link></p>
                {message && <p className={`message ${message === 'Registration successful' ? 'success' : 'error'}`}>{message}</p>}
               
            </form>
        </div>
    );
};

export default SignUp;
