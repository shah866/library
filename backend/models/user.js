const mongoose = require('mongoose');
const vali =require('validator')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true ,' please enter your  first name'] },
    lastName: { type: String, required:[true ,' please enter your last name'] },
    email: { type: String, required: [true ,' please enter your email '], unique: true , validate :
        [vali.isEmail , 'please enter a valid email']
     },
     password: { 
        type: String, 
        required: [true, 'Please enter your password'], 
        minlength: [8, 'Password must be at least 8 characters long'] },
        
        isConfirmed: { type: Boolean, default: false },
        confirmationToken: { type: String },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
        accountBalance: { type: Number, default: 0 } 
   
   
});

const User = mongoose.model('User', userSchema);

module.exports = User;
