
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const borrowedBookSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    borrowedBy: { type: String },
       
    
    borrowedAt: { type: Date, default: Date.now },
    transactionStatus: { type: String, enum: ['pending', 'confirmed'], default: 'pending' },
    confirmationToken: { type: String,  unique: true }
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);
module.exports = BorrowedBook;
