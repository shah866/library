import React from 'react';
import SignUp from './components/SignUp';
import Login from './components/login';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ConfirmEmail from './components/ConfirmEmail';


const App = () => {
    return (
      <Routes>
      <Route path="/" element={<Login/>} /> 
      <Route path="/confirm/:token" element={<ConfirmEmail></ConfirmEmail>}></Route>
     
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profiles/:userId" element={<ProtectedRoute element={<Profile  />} />} />
      </Routes>
    );
};

export default App;
