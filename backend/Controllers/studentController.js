// controllers/studentController.js

const Student = require('../models/Student');

// Add a new student
exports.addStudent = async (req, res) => {
    const { firstName, lastName, email, enrollmentNumber } = req.body;
    try {
        // Check if email or enrollmentNumber already exists
        const existingStudent = await Student.findOne({ $or: [{ email }, { enrollmentNumber }] });
        if (existingStudent) {
            return res.status(400).json({
                message: `A student with the email (${email}) or enrollment number (${enrollmentNumber}) already exists.`
            });
        }

        // Create new student
        const newStudent = new Student({ firstName, lastName, email, enrollmentNumber });
        const student = await newStudent.save();
        res.status(201).json({
            message: 'Student added successfully!',
            student
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while adding the student. Please try again later.',
            error: error.message
        });
    }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
