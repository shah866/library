import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BalanceFilling.css'; // Create and style this CSS file accordingly
import Balance from './Balance';

const BalanceFilling = () => {
    const [formData, setFormData] = useState({
        amount: '',
        paymentMethod: 'creditCard'
    });
    const [BalanceUpdated,setBalanceUpdated] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // Assuming you store user ID in localStorage

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const goback = () => {
        navigate('/bookList');
    };

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/addBalance', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, ...formData })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Balance added successfully');
                handleBalance(); 
              
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };
    const handleBalance = () => {
        setBalanceUpdated(!BalanceUpdated); 
      };

    return (
        <>
        <div className="balance-filling-container">

            <form className="balance-filling-form" onSubmit={onSubmit}>
                <h2 className="balance-filling-title">Add Balance</h2>
                <div className="input-container">
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Payment Method:</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={onChange}
                        required
                    >
                        <option value="creditCard">Credit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
                <button className="button" type="submit">Confirm Payment</button>
                {message && <p className="message">{message}</p>}
                
            </form>
          
        </div>
          <Balance BalanceUpdated={handleBalance}></Balance>
          <button className="add-book-button" onClick={goback}>
                →
            </button>
          </>
    );
};

export default BalanceFilling;
