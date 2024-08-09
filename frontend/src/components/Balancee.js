import React, { useState, useEffect } from 'react';
// import './Balance.css';

const Balancee = ({ onBalanceUpdate }) => {
    const userId = localStorage.getItem('userId');
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBalance = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/balance/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                setBalance(data.balance);
                onBalanceUpdate(data.balance); // Update the balance in the parent component
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An error occurred while fetching the balance.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="balance-container">
            <h2>User Balance</h2>
            <p>Account Balance: ${balance}</p>
        </div>
    );
};

export default Balancee;
