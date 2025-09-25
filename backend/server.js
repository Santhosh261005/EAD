const mongoose = require('mongoose');
const Student = require('./models/user');


const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

require('dotenv').config();
const connectDB = require('./config/connect');



app.use(express.json());

// Optional: Basic CSP header (for security)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:4000"
  );
  next();
});


// Save student
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: ' Student saved', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ' Save failed' });
  }
});


// List students
app.get('/students', async (req, res) => {
  try {
    const list = await Student.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: ' Fetch failed' });
  }
});



const port = process.env.PORT || 4000;

const start = async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to the MongoDB successfully');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
