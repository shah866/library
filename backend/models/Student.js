const mongoose = require('mongoose');
const vali =require('validator')
const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true , validate :
        [vali.isEmail , 'please enter a valid email'] },
    enrollmentNumber: { type: String, required: true, unique: true , unique: true 
     }, 
     payments: [{
        amount: Number,
        date: { type: Date, default: Date.now }
    }]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
