import React from 'react';
import SignUp from './components/SignUp';
import Login from './components/login';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import ConfirmEmail from './components/ConfirmEmail';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import BorrowBook from './components/BorrowBook';
import BorrowedBooks from './components/BorrowedBooks';
// import Fees from './components/Fees';

const App = () => {
    return (
      <Routes>
      <Route path="/" element={<Login/>} /> 
      <Route path="/confirm/:token" element={<ConfirmEmail></ConfirmEmail>}></Route>
     
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profiles/:userId" element={<ProtectedRoute element={<Profile  />} />} />
      <Route path="/books" element={<ProtectedRoute element={<AddBook  />} />} />

      <Route path="/bookList" element={<ProtectedRoute element={<BookList />} />} />

      <Route path="/students" element={<ProtectedRoute element={<AddStudent  />} />} />
      
      <Route path="/studentList" element={<ProtectedRoute element={<StudentList />} />} />
      
      <Route path="/borrow" element={<ProtectedRoute element={<BorrowBook />} />} />
      <Route path="/borrowed-books" element={<ProtectedRoute element={<BorrowedBooks />} />} />
      {/* <Route path="/monthly-subscription" element={<ProtectedRoute element={<Fees />} />} /> */}
     
      </Routes>
    );
};

export default App;
