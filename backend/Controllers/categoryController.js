// controllers/categoryController.js

const Category = require('../models/Category');

// Controller to add a new category
exports.addCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new Category({ name });
        const category = await newCategory.save();
        res.status(201).json(category);
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ message: 'Category already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Controller to get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
