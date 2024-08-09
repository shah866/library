// // components/BorrowBook.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const BorrowBook = () => {
//     const [formData, setFormData] = useState({
//         title: '',
//         author: '',
//         email: '',
//         enrollmentNumber: ''
//     });
//     const [books, setBooks] = useState([]);
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();
//     const goback = () => {
//         navigate('/borrowed-books');
       
//       };
    

//     const onChange = e => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const onSubmit = async e => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:5000/api/books/borrow', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setMessage('Book borrowed successfully');
//                 alert("Book borrowed successfully ");
//                  navigate('/borrowed-books');
//             } else {
//                 setMessage(data.message);
//             }
//         } catch (error) {
//             setMessage('An error occurred. Please try again.');
//         }
//     };

//     return (
//         <div className="container">
//             <form className="form" onSubmit={onSubmit}>
//                 <h2 className="title">Borrow Book</h2>
//                 <div className="input-container">
//                     <label> Book Title:</label>
//                     <input type="text" name="title" value={formData.title} onChange={onChange} required />
//                 </div>
//                 <div className="input-container">
//                     <label> Book Author:</label>
//                     <input type="text" name="author" value={formData.author} onChange={onChange} required />
//                 </div>
//                 <div className="input-container">
//                     <label> Student Email:</label>
//                     <input type="email" name="email" value={formData.email} onChange={onChange} required />
//                 </div>
//                 <div className="input-container">
//                     <label> Student Enrollment Number:</label>
//                     <input type="text" name="enrollmentNumber" value={formData.enrollmentNumber} onChange={onChange} required />
//                 </div>
//                 <button className="button" type="submit">Borrow Book</button>
//                 {message ==='Book borrowed successfully' ?  <p style={{color:"green", marginTop: "1rem",
//     textAlign: "center"}}>{message}</p> : <p className="message">{message}</p>}
//             </form>
//             <button className="add-book-button" onClick={goback}>
//             →	
//         </button>
//         </div>
//     );
// };

// export default BorrowBook;


//////new codde//
import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './BorrowBook.css';

const BorrowBook = ({  bookId }) => {
    const userId=localStorage.getItem('userId');
    const [message, setMessage] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');
    // const navigate = useNavigate();

    const handleBorrowBook = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/books/borrow', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, bookId }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setTransactionStatus(data.transactionStatus);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred while borrowing the book.');
        }
    };

    return (
        <div className="borrow-book-container">
            <button onClick={handleBorrowBook}>Borrow Book</button>
            {message && <p>{message}</p>}
            {transactionStatus === 'pending' && <p>Waiting for admin confirmation...</p>}
        </div>
    );
};

export default BorrowBook;
