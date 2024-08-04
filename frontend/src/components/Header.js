import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import userPic from '../assets/pic.png'; // Replace with the path to your image

const Header = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toDateString();
  const currentTime = new Date().toLocaleTimeString();
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  const userId = localStorage.getItem('userId');

  const handleProfileClick = () => {
    navigate(`/profiles/${userId}`);
  };

  return (
    <div className="header">
      <div className="date-time">
        <div className="date">{currentDate}</div>
        <div className="time">{currentTime}</div>
      </div>
      <div className="user-info" onClick={handleProfileClick}>
        <img src={userPic} alt="User" className="user-pic" />
        <div className="user-name">{firstName} {lastName}</div>
      </div>
    </div>
  );
};

export default Header;
