const Book = require('../models/Book');

// Controller to add a new book
exports.addBook = async (req, res) => {
    const { title, author, category, pages, image } = req.body;

    try {
        const newBook = new Book({ title, author, category, pages, image });
        const book = await newBook.save();
        res.status(201).json(book);
    } catch (error) {
        if (error.code === 11000) { // 11000 is the code for duplicate key error in MongoDB
            res.status(400).json({ message: 'Book with this title and author already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Controller to get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
