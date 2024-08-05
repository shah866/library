import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <p onClick={handleLogout} style={{cursor: "pointer"}}  >
      Logout
    </p>
  );
};

export default Logout;