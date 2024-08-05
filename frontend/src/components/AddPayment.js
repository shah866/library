import React, { useState } from 'react';

const AddPayment = ({ studentId, onPaymentAdded }) => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/students/addPayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ studentId, amount })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Payment added successfully');
                setAmount('');
                onPaymentAdded(); // Call the function passed from the parent component
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Add Payment</button>
            </form>
            {message && <p style={{color:"green"}}>{message}</p>}
        </div>
    );
};

export default AddPayment;
