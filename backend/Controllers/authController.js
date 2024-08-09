
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


// Registration controller
// Registration controller
exports.register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Generate a confirmation token
        const confirmationToken = crypto.randomBytes(20).toString('hex');
        console.log('Generated Confirmation Token:', confirmationToken); // Log the token

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            confirmationToken,
            role: role || 'user' // Default role to 'user' if not provided
        });

        // Save the user
        const user = await newUser.save();
        console.log('Saved User:', user); // Log the saved user

        // Send confirmation email
        const confirmUrl = `http://localhost:3000/confirm/${confirmationToken}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Confirm your email',
            html: `<p>Hi ${user.firstName},</p><p>Please confirm your email by clicking the link below:</p><a href="${confirmUrl}">Confirm Email</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ message: 'Error sending confirmation email' });
            res.status(201).json({ message: 'User registered successfully. Please check your email for confirmation.' });
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages });
        }
        res.status(500).json({ message: error.message });
    }
};


// Email confirmation controller
exports.confirmEmail = async (req, res) => {
    try {
        console.log('Received Token:', req.params.token); // Log the received token
        const user = await User.findOne({ confirmationToken: req.params.token });
        if (!user) return res.status(400).json({ message: 'Invalid token' });

        console.log('Found User:', user); // Log the found user
        user.isConfirmed = true;
        user.confirmationToken = null;

        // Save the updated user to the database
        await user.save();
        console.log('Updated User:', user); // Log the updated user
        
    } catch (error) {
        console.error('Error during email confirmation:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Resend confirmation email controller
exports.resendConfirmationEmail = async (req, res) => {
    try {
        console.log("user id"+req.params.userId);
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.isConfirmed) return res.status(400).json({ message: 'Email is already confirmed' });

        user.confirmationToken = crypto.randomBytes(20).toString('hex');
        await user.save();

        const confirmUrl = `http://localhost:3000/confirm/${user.confirmationToken}`;

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Confirm your email',
            html: `<p>Hi ${user.firstName},</p><p>Please confirm your email by clicking the link below:</p><a href="${confirmUrl}">Confirm Email</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error resending confirmation email:', error.message);
                return res.status(500).json({ message: error.message });
            }
            res.status(200).json({ message: 'Confirmation email sent' });
        });
    } catch (error) {
        console.error('Error during resend confirmation:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Login controller
// Login controller
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7h' });

        res.json({ 
            token, 
            user: { 
                id: user._id, 
                firstName: user.firstName, 
                lastName: user.lastName, 
                email: user.email, 
                isConfirmed: user.isConfirmed,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: error.message });
    }
};


exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            html: `<p>Hi ${user.firstName},</p><p>Click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ message: 'Error sending password reset email' });
            res.status(200).json({ message: 'Password reset email sent' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ 
            resetPasswordToken: token, 
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        // Validate the old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

        // Hash the new password and update the user
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


