import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ConfirmBorrow.css';

const ConfirmBorrow = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    useEffect(() => {
        const confirmBorrowRequest = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/confirm-borrow/${token}`, {
                    // method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setMessage('Borrow request confirmed successfully.');

                    // setTimeout(() => {
                    //     navigate('/bookList');
                    // }, 2000);
                } else {
                    setMessage(`Error: ${data.message}`);
                }
            } catch (error) {
                setMessage('An error occurred while confirming the borrow request.');
            } finally {
                setLoading(false);
            }
        };

        confirmBorrowRequest();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="confirm-borrow-container">
            <h2>Borrow Request Confirmation</h2>
            {/* <p>{message}</p> */}
            <p style={{color:"green"}}>Borrow request confirmed successfully.</p>
        </div>
    );
};

export default ConfirmBorrow;
