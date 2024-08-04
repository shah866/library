import React, { useEffect, useState } from 'react';
import './BookList.css';
import Sidebar from './Sidebar';
import Header from './Header';
import SearchBar from './SearchBar';
import BookCard from './Bookcard';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:5000/api/books/all',{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  }
            });
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    

    
  const add = () => {
    navigate('/books');
   
  };
    return (
        <div className="app">
          <Sidebar></Sidebar>
          <div className="main-content">
        <Header></Header>
            <div className="book-section">
              <h2>Books</h2>
              <SearchBar />
              <div className="book-list">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
              <button className="add-book-button" onClick={add}>
          +
        </button>
            </div>
          </div>
        </div>
      );
    };
    

export default BookList;
