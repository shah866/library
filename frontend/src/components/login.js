import React, { useState } from 'react';
import './login.css';
import {useNavigate,Link} from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                // Store user details in local storage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.user.id);
                localStorage.setItem('firstName', data.user.firstName);
                localStorage.setItem('lastName', data.user.lastName);
                localStorage.setItem('email', data.user.email);
                localStorage.setItem('isConfirmed',data.user.isConfirmed);

               const userId=localStorage.getItem('userId')
                setMessage('Login successful');
                
                //navigate(`/profiles/${userId}`);
                navigate('/bookList');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={onSubmit}>
                <h2 className="login-title">Login</h2>
                <div className="input-container">
                    <label>Email:</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <button className="login-button" type="submit">Login</button>
                <p>   Don't Have an Account? <Link to="/signup" >SignUp</Link></p>
             <strong>  {message && <p className="login-message">{message}</p>} </strong> 
            </form>
        </div>
    );
};

export default Login;
