import React from 'react';
import { NavLink ,  useLocation } from 'react-router-dom';
import './Sidebar.css';
import Logout from './Logout';

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
          <NavLink to="/borrowed-books"  style={{ color: location.pathname === '/borrowed-books' ? '#ff5733' : '#333' }} >Borrowed Books</NavLink>
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
      <br></br>
      <hr></hr>
      <Logout></Logout>
      </ul>
    </div>
  );
};

export default Sidebar;
