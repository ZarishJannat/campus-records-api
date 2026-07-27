const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long']
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  semester: {
    type: Number,
    required: [true, 'Semester is required'],
    min: [1, 'Semester must be at least 1'],
    max: [8, 'Semester cannot exceed 8']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^03[0-9]{9}$/, 'Please provide a valid Pakistan mobile number (format: 03XXXXXXXXX)']
  },
  cgpa: {
    type: Number,
    required: [true, 'CGPA is required'],
    min: [0, 'CGPA cannot be less than 0'],
    max: [4, 'CGPA cannot exceed 4']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: 'Gender must be Male, Female, or Other'
    }
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [16, 'Age must be at least 16'],
    max: [35, 'Age cannot exceed 35']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
