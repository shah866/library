const express = require('express');
const router = express.Router();
const cate=require('../controllers/categoryController');
const isAdmin = require('../middleware/isAdmin'); 
const verifyToken = require('../middleware/auth');

// Route to add a new book
router.post('/add', verifyToken, isAdmin, cate.addCategory);

// Route to get all books
router.get('/all', verifyToken, cate.getAllCategories);



module.exports = router;
