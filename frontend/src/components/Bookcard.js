import React from 'react';
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} className="book-image" />
      <div className="book-details">
        <p><strong>Name:</strong> {book.title}</p>
        <p><strong>category: </strong>{book.category}</p>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Pages:</strong> {book.pages}</p>
    
      </div>
    </div>
  );
};

export default BookCard;
