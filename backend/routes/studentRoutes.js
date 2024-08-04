// routes/studentRoutes.js

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/add', studentController.addStudent);
router.get('/all', studentController.getAllStudents);

module.exports = router;
