const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin'); 

// Route to add a new book
router.post('/add', verifyToken, isAdmin, bookController.addBook);


router.get('/confirm-borrow/:token', verifyToken, bookController.confirmBorrow);

// Route to get all books
router.get('/all', verifyToken, bookController.getAllBooks);

router.post('/borrow', verifyToken, bookController.borrowBook);

router.get('/borrowed', verifyToken, bookController.getAllBorrowedBooks);

router.get('/confirmed-borrowed-books/:userId',verifyToken, bookController.getConfirmedBorrowedBooks);

// Get all unconfirmed borrowed books for a user
router.get('/unconfirmed-borrowed-books/:userId',verifyToken, bookController.getUnconfirmedBorrowedBooks);
module.exports = router;
