// BorrowedBooks.js
import React, { useEffect, useState } from 'react';
import './BorrowedBooks.css'; // Import the CSS file
import Sidebar from './Sidebar';
import Header from './Header';

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/books/borrowed', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                setBorrowedBooks(data);
                console.log({borrowedBooks});
            } catch (error) {
                console.error('Error fetching borrowed books:', error);
            }
        };

        fetchBorrowedBooks();
    }, [token]);

    return (
        <div className="appp">
        <Sidebar />
        <div className="main-contentt">
            <Header />
            <br></br>
            <h2>Borrowed Books</h2>
            <div className="borrowed-books-container">
                {borrowedBooks.map((book, index) => (
                    <div key={index} className="borrowed-book-card">
                        <p> <strong>BookTilte:</strong> {book.bookTitle}</p>
                        <p><strong>Author:</strong> {book.bookAuthor}</p>
                        <p><strong>Borrowed By:</strong>  {book.studentName }
                        <br></br> <strong> Email:</strong> {book.borrowedBy.email}</p>
                        <p><strong>Enrollment Number:</strong> {book.borrowedBy.enrollmentNumber}</p>
                        <p><strong>Borrowed At:</strong> {new Date(book.borrowedAt).toLocaleDateString()}</p>
                        {book.warning && <p className="warning">{book.warning}</p>}
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default BorrowedBooks;
