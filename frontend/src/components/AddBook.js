import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Import the CSS file

const AddBook = () => {
    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        author: '',
        category: '',
        pages: '',
        image: '',
        price: '',
        copies: ''
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch categories when the component mounts
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories/all',{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                         'Content-Type': 'application/json'
                    }
                    });
                const data = await response.json();
                if (response.ok) {
                    
                    setCategories(data);
                    console.log("hi"+ data[0]);
                } else {
                    setMessage(`Error fetching categories: ${data.message}`);
                }
            } catch (error) {
                setMessage('An error occurred while fetching categories.');
            }
        };

        fetchCategories();
    }, []);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
                alert('Book added successfully');
                navigate('/bookList');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    const goback = () => {
        navigate('/bookList');
    };

    return (
        <div className="container">
            <form className="form" onSubmit={onSubmit}>
                <h2 className="title">Add Book</h2>
                <div className="input-container" style={{display:'flex',flexDirection:'row'}}>
                    <label>ISBN:</label>
                    <div style={{width:'10px'}}></div>
                    <input type="Number" name="isbn" value={formData.isbn} onChange={onChange} required />
                </div>
                <div className="input-container" style={{display:'flex',flexDirection:'row'}}>
                    <label>Title:</label>
                    <div style={{width:'10px'}}></div>
                    <input type="text" name="title" value={formData.title} onChange={onChange} required />
                </div>
                <div className="input-container" style={{display:'flex',flexDirection:'row'}}>
                    <label>Author:</label>
                    <div style={{width:'10px'}}></div>
                    <input type="text" name="author" value={formData.author} onChange={onChange} required />
                </div>
                <div className="input-container"  style={{display:'flex',flexDirection:'row'}}>
                    <label>Category:</label>
                    <div style={{width:'10px'}}></div>
                    <select name="category" value={formData.category} onChange={onChange} required>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="input-container"  style={{display:'flex',flexDirection:'row'}}>
                    <label>Pages:</label>
                    <div style={{width:'10px'}}></div>
                    <input type="Number" name="pages" value={formData.pages} onChange={onChange} required />
                </div>
                <div className="input-container"  style={{display:'flex',flexDirection:'row'}}>
                    <label>Price:</label>
                    <div style={{width:'10px'}}></div>
                    <input type="Number" name="price" value={formData.price} onChange={onChange} required />
                </div>
                <div className="input-container" style={{display:'flex',flexDirection:'row'}}>
                    <label>Copies:</label>
                    <div style={{width:'10px'}}></div>
                    <input type="Number" name="copies" value={formData.copies} onChange={onChange} required />
                </div>
                <div className="input-container"  style={{display:'flex',flexDirection:'row'}}>
                    <label>Image:</label>
                    <div style={{width:'10px'}}></div>
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
