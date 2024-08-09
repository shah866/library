const express = require('express');
const authController = require('../Controllers/authController')

const router = express.Router();

router.route('/signup').post(authController.register);


router.post('/login', authController.login);

router.get('/confirm/:token', authController.confirmEmail);

router.post('/resend-confirmation/:userId', authController.resendConfirmationEmail);

router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/reset-password/:token', authController.resetPassword);


module.exports = router;