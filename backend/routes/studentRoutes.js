const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const verifyToken = require('../middleware/auth');

// Add a new student
router.post('/add', verifyToken, studentController.addStudent);

// Get all students
router.get('/all', verifyToken, studentController.getAllStudents);

module.exports = router;
