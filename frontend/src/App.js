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
import RequestPasswordReset from './components/RequestPasswordReset';
import ResetPassword from './components/ResetPassword';
import Category from './components/Category';
import BalanceFilling from './components/BalanceFilling';
import Balance from './components/Balance';
import ConfirmBorrow from './components/ConfirmBorrow';
import UnconfirmedBorrowedBooks from './components/UnconfirmedBorrowedBooks';
import ConfirmedBorrowedBooks from './components/ConfirmedBorrowedBooks';
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
      
      <Route path="/userList" element={<ProtectedRoute element={<StudentList />} />} />
      
      <Route path="/borrow" element={<ProtectedRoute element={<BorrowBook />} />} />
      <Route path="/borrowed-books" element={<ProtectedRoute element={<BorrowedBooks />} />} />
      {/* <Route path="/monthly-subscription" element={<ProtectedRoute element={<Fees />} />} /> */}
      <Route path="/request-password-reset" element={<ProtectedRoute element={<RequestPasswordReset />} />} />
      <Route path="/reset-password/:token" element={<ProtectedRoute element={<ResetPassword />} />} />
      <Route path="/add-category" element={<ProtectedRoute element={<Category />} />} />
      <Route path="/balance/:userId"  element={<ProtectedRoute element={<Balance />} />} />
   <Route path="/add-balance" element={<ProtectedRoute element={<BalanceFilling />} />} />
   <Route path="/confirm-borrow/:token" element={<ProtectedRoute element={<ConfirmBorrow />} />} />
   <Route path="/waittingList" element={<ProtectedRoute element={<UnconfirmedBorrowedBooks />} />} />

   <Route path="/borrowed"element={<ProtectedRoute element={<ConfirmedBorrowedBooks />} />} /> 
      </Routes>
    );
};

export default App;
