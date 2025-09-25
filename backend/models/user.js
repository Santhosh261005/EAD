const mongoose = require('mongoose'); // Add this at the top

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  gender: { type: String, enum: ['Male','Female'], required: true },
  department: { type: String, enum: ['IT','CSE','AIDS','CET'], required: true },
  section: { type: Number, enum: [1,2,3], required: true },
  skills: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;