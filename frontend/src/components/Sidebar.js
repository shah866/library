import React from 'react';
import { NavLink ,  useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>School Book Club</h1>
        <br></br>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/bookList" style={{ color: location.pathname === '/bookList' ? '#ff5733' : '#333' }}  >Books</NavLink>
        </li>
        <br></br>
        <li>
          <NavLink to="/borrow" >Borrow</NavLink>
        </li>
        <br></br>
        <li>
          <NavLink to="/borrowed-books" >Borrowed Books</NavLink>
        </li>
        <br></br>
        <li>
          <NavLink to="/add-category" >Add category</NavLink>
        </li>
        <br></br>
        <li >
          <NavLink to="/studentList"  style={{ color: location.pathname === '/studentList' ? '#ff5733' : '#333' }} >Students</NavLink>
        </li>
        <br></br>
        <li>
          <NavLink to="/monthly-subscription" >Monthly subscription fees</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
