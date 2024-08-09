const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    copies: {
        type: Number,
        required: true,
        min: 0,
    },
    isBorrowed: {
        type: Boolean,
        default: false,
    },
    pages: {
        type: Number,
    },
    image: {
        type: String,
    },
    price:{
        type: Number,
    }

});

module.exports = mongoose.model('Book', bookSchema);
