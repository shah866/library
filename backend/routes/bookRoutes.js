const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/auth');
// Route to add a new book
router.post('/add', verifyToken, bookController.addBook);

// Route to get all books
router.get('/all', verifyToken, bookController.getAllBooks);

module.exports = router;
