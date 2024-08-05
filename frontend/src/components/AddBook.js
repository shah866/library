import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './AddBook.css';

const AddBook = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        pages: '',
        image: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const goback = () => {
        navigate('/bookList');
       
      };

      const token = localStorage.getItem('token');
    const onFileChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/books/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Book added successfully');
                alert("Book added successfully ");
                navigate('/bookList');
        
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={onSubmit}>
                <h2 className="title">Add Book</h2>
                <div className="input-container">
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Author:</label>
                    <input type="text" name="author" value={formData.author} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Category:</label>
                    <input type="text" name="category" value={formData.category} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Pages:</label>
                    <input type="number" name="pages" value={formData.pages} onChange={onChange} required />
                </div>
                <div className="input-container">
                    <label>Image:</label>
                    <input type="file" name="image" onChange={onFileChange} required />
                </div>
                <button className="button" type="submit">Add Book</button>
                {message && <p className="message">{message}</p>}
            </form>
            <button className="add-book-button" onClick={goback}>
            →	
        </button>
            
        </div>
    );
};

export default AddBook;
