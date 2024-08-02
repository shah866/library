// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const nodemailer = require('nodemailer');
// const crypto = require('crypto');

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

// // Registration controller
// exports.register = async (req, res) => {
//     const { firstName, lastName, email, password } = req.body;
//     const confirmationToken = crypto.randomBytes(20).toString('hex');

//     // Create an instance of the User model
//     const newUser = new User({
//         firstName,
//         lastName,
//         email,
//         password,
//         confirmationToken
//     });

//     // Validate the new user data
//     try {
//         await newUser.validate();
//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             const messages = Object.values(error.errors).map(val => val.message);
//             console.error('Validation Error:', messages);
//             return res.status(400).json({ message: messages });
//         }
//         console.error('Error during validation:', error.message);
//         return res.status(500).json({ message: error.message });
//     }

//     try {
//         // Check if the user already exists
//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             console.error('User already exists');
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Save the new user with the hashed password
//         newUser.password = hashedPassword;
//         const user = await newUser.save();
        
//         const confirmUrl = `http://localhost:3000/confirm/${newUser.confirmationToken}`;

//         const mailOptions = {
//             from: process.env.EMAIL,
//             to: user.email,
//             subject: 'Confirm your email',
//             html: `<p>Hi ${user.firstName},</p><p>Please confirm your email by clicking the link below:</p><a href="${confirmUrl}">Confirm Email</a>`
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending confirmation email:', error.message);
//                 return res.status(500).json({ message: error.message });
//             }
//             res.status(201).json({ message: 'User registered successfully. Please check your email for confirmation.' });
//         });
//     } catch (error) {
//         console.error('Error during registration:', error.message);
//         res.status(500).json({ message: error.message });
//     }
// };

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
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

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
            confirmationToken
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
        user.confirmationToken = confirmationToken;

        // Save the updated user to the database
        await user.save();
        console.log('Updated User:', user); // Log the updated user

        res.redirect('http://localhost:3000/');
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
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7h' });

        res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email , 
            isConfirmed: user.isConfirmed } });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: error.message });
    }
};
