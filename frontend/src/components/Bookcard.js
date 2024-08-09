import React from 'react';
import './BookCard.css';
import BorrowBook from './BorrowBook';

const BookCard = ({ book }) => {
  const role =localStorage.getItem('role');
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-image" />
      <div className="book-details">
      <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Name:</strong> {book.title}</p>
        <p><strong>category: </strong>{book.category}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
        <p><strong>Price:</strong> {book.price}</p>
        <p><strong>Number of copies available:</strong> {book.copies}</p>
        {role==='user'?<BorrowBook bookId={book._id}></BorrowBook>:null}
      </div>
      
    </div>
  );
};

export default BookCard;
