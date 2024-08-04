const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route to add a new book
router.post('/add', bookController.addBook);

// Route to get all books
router.get('/all', bookController.getAllBooks);

module.exports = router;
