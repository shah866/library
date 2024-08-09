import React, { useState, useEffect } from 'react';
import './BorrowedBooks.css';
import Sidebar from './Sidebar';
import Header from './Header';

const ConfirmedBorrowedBooks = () => {
    const userId = localStorage.getItem('userId');
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConfirmedBorrowedBooks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/confirmed-borrowed-books/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setBorrowedBooks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConfirmedBorrowedBooks();
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="appp">
            <Sidebar />
            <div className="main-contentt">
                <Header />
                <br />
                <h2>Confirmed Borrowed Books</h2>
                <div className="borrowed-books-container">
                 
                
                    {borrowedBooks.length > 0 ? (
                        borrowedBooks.map((book) => (
                            <div key={book._id} className="borrowed-book-card">
                                <p><strong>Title:</strong> {book.bookTitle}</p>
                                <p><strong>Author:</strong> {book.bookAuthor}</p>
                                <p><strong>Borrowed On:</strong> {new Date(book.borrowedAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No confirmed borrowed books found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmedBorrowedBooks;
