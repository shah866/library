const User = require('../models/user');
const nodemailer = require('nodemailer');

// Add balance to user account (mock payment process)
exports.addBalance = async (req, res) => {
    const { userId, amount, paymentMethod } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Simulate payment processing
        console.log(`Processing payment of $${amount} using ${paymentMethod}`);
        const numericAmount = parseFloat(amount);
        user.accountBalance += numericAmount;
        await user.save();

        // Set up Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or another email service
            auth: {
                user: process.env.EMAIL, // your email address
                pass: process.env.EMAIL_PASSWORD // your email password
            }
        });

        // Compose the email
        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to: user.email, // recipient address
            subject: 'Balance Added Successfully',
            text: `Dear ${user.firstName},\n\nYour account has been credited with $${numericAmount}. Your new balance is $${user.accountBalance}.\n\nThank you for using our service!\n\nBest regards,\nSchool Book Club`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Balance added successfully and email sent', accountBalance: user.accountBalance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBalance = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ balance: user.accountBalance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getNonAdminUsers = async (req, res) => {
    try {
      const nonAdminUsers = await User.find({ role: { $ne: 'admin' } });
      res.status(200).json(nonAdminUsers);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  };