const express = require('express');
const userController = require('../Controllers/userController');
const verifyToken = require('../middleware/auth');

const router = express.Router();
router.post('/addBalance',verifyToken, userController.addBalance);
router.get('/balance/:userId',verifyToken, userController.getBalance);
router.get('/non-admin-users', userController.getNonAdminUsers);

module.exports = router;