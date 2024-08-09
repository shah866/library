import React, { useState, useEffect } from 'react';
import './BorrowedBooks.css'; // Add styles as needed
import Sidebar from './Sidebar';
import Header from './Header';

const UnconfirmedBorrowedBooks = () => {
    const userId = localStorage.getItem('userId');
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUnconfirmedBorrowedBooks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/books/unconfirmed-borrowed-books/${userId}`, {
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

        fetchUnconfirmedBorrowedBooks();
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
                <h2>Unconfirmed Borrowed Books</h2>
                <div className="borrowed-books-container">
                   
                    {borrowedBooks.length > 0 ? (
                        borrowedBooks.map((book) => (
                            <div key={book._id} className="borrowed-book-card">
                                <p><strong>Title:</strong> {book.bookTitle}</p>
                                <p><strong>Author:</strong> {book.bookAuthor}</p>
                                <p><strong>Requested On:</strong> {new Date(book.borrowedAt).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                   
                       
                        <div>No unconfirmed borrowed books found.</div>
                     
                    )}
                </div>
            </div>
        </div>
    );
};

export default UnconfirmedBorrowedBooks;
