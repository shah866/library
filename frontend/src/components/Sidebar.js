import React from 'react';
import { NavLink ,  useLocation } from 'react-router-dom';
import './Sidebar.css';
import Logout from './Logout';

const Sidebar = () => {
  const location = useLocation();
  const role =localStorage.getItem('role');
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 >School Book Club</h1>
        { role==='admin'? <h4 style={{color:'#ff5733',textAlign:'center'}}>Admin Page</h4> :null}
        <br></br>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/bookList" style={{ color: location.pathname === '/bookList' ? '#ff5733' : '#333' }}  >Books</NavLink>
        </li>
     
        <br></br>
        <li>
        { role==='admin'?    <NavLink to="/borrowed-books"  style={{ color: location.pathname === '/borrowed-books' ? '#ff5733' : '#333' }} >Borrowed Books</NavLink>: <NavLink to="/waittingList"  style={{ color: location.pathname === '/waittingList' ? '#ff5733' : '#333' }} >Pending Books</NavLink>}
        </li>
        <br></br>
        <li>
        { role==='admin'?  <NavLink to="/add-category" >Add category</NavLink>:<NavLink to="/add-balance" >Add Balance</NavLink>}
        </li>
        <br></br>
        <li >
        { role==='admin'?  <NavLink to="/userList"  style={{ color: location.pathname === '/userList' ? '#ff5733' : '#333' }} >Users</NavLink>: <NavLink to="/borrowed"  style={{ color: location.pathname === '/borrowed' ? '#ff5733' : '#333' }} >BorrowedBook</NavLink>}
        </li>
      <br></br>
      <br></br>
      <hr></hr>
      <Logout></Logout>
      <li >
          <NavLink to="/request-password-reset"  style={{ color: location.pathname === '/request-password-reset' ? '#ff5733' : '#333' }} >Reset Password</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
