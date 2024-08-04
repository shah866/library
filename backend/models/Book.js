const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    pages: { type: Number, required: true },
    image: { type: String, required: true }
});

//  compound index to ensure the combination of title and author is unique
bookSchema.index({ title: 1, author: 1 }, { unique: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
