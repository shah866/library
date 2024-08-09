import React, { useState } from 'react';
import './Category.css';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/categories/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Category added successfully');
        } else {
            setMessage(`Error: ${data.message}`);
        }

        setName('');
    };
    
    const goback = () => {
        navigate('/bookList');
    };

    return (
        <div className="category-wrapper">
            <div className="category-container">
                <h2>Add New Category</h2>
                <form onSubmit={onSubmit} className="category-form">
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Category Name"
                        required
                        className="category-input"
                    />
                    <button type="submit" className="category-button">Add Category</button>
                </form>
                {message && <p className="category-message">{message}</p>}
            </div>
            <button className="add-book-button" onClick={goback}>
                →
            </button>
        </div>
    );
};

export default Category;
