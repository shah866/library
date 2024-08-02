import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import  g from '../assets/g.jpg'; 

const ConfirmEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/confirm/${token}`);
                const data = await response.json();
                      console.log(token);
                if (response.ok) {
                    setMessage('Email confirmed successfully.');
                } else {
                    setMessage(data.message);
                }
            } catch (error) {
                setMessage('Error confirming email.');
            }
        };

        confirmEmail();
    }, [token]);

    const navigateToLogin = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Email Confirmation</h2>
            {/* <p>{message}</p> */}
            <img
                src={g}
                alt="Confirmation"
                style={{ width: '150px', height: '150px', marginBottom: '20px' }}
            />
            <div>
                <button onClick={navigateToLogin} style={{ padding: '10px 20px', cursor: 'pointer' ,backgroundColor:'#f1f1f1'}}>
                    Go to Login
                </button>
            </div>
        </div>
    );
};

export default ConfirmEmail;
