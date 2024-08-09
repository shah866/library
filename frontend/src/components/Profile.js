import pic from '../assets/pic.png'; 
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Logout from './Logout';
import Balancee from './Balancee';

const Profile = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/bookList');
    };

    const user = {
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        email: localStorage.getItem('email'),
        isConfirmed: localStorage.getItem('isConfirmed'),
        userId: localStorage.getItem('userId'),
    };

    const [message, setMessage] = useState('');
    // const [balance, setBalance] = useState(null);

    const resendConfirmationEmail = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/resend-confirmation/${user.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('An error occurred while resending the confirmation email.');
        }
    };

    // const handleBalanceUpdate = (newBalance) => {
    //     setBalance(newBalance);
    // };

    return (
        <div className="appp">
            <Sidebar />
            <div className="main-contentt">
                <Header />
                <div className="profile-container">
                    <div className="profile-pic">
                        <img src={pic} alt="Profile" />
                    </div>
                    <div className="profile-info">
                        <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
                        <p className="profile-email">
                            {user.email}
                            <span className={user.isConfirmed === "true" ? "confirmed" : "unconfirmed"} onClick={user.isConfirmed === "false" ? resendConfirmationEmail : undefined}>
                                {user.isConfirmed === "true" ? "(confirmed)" : "(Unconfirmed)"}
                            </span>
                        </p>
                        {message && <p className="profile-message">{message}</p>}
                        {/* <Balancee onBalanceUpdate={handleBalanceUpdate} /> */}
                        {/* Display the balance */}
                        {/* {balance !== null && <p>Balance: ${balance}</p>} */}
                    </div>
                    {/* <p> Your Role: {role}</p> */}
                </div>
            </div>
        </div>
    );
};

export default Profile;
