import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddStudent.css';

const AddStudent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        enrollmentNumber: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const goBack = () => {
        navigate('/studentList');
    };

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/students/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Student added successfully');
                navigate('/studentList');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={onSubmit}>
                <h2 className="title">Add Student</h2>
                <div className="input-container">
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Enrollment Number:</label>
                    <input type="text" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={onChange} required />
                </div>
                <button className="button" type="submit">Add Student</button>
                {message && <p className="message">{message}</p>}
            </form>
            <button className="back-button" onClick={goBack}>
                →
            </button>
        </div>
    );
};

export default AddStudent;
