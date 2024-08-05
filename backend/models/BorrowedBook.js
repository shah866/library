
const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    borrowedBy: {
        email: { type: String, required: true },
        enrollmentNumber: { type: String, required: true }
    },
    borrowedAt: { type: Date, default: Date.now }
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);
module.exports = BorrowedBook;
