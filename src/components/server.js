// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',   // Your MySQL host
  user: 'root',        // Your MySQL user
  password: 'Dinesh@123',        // Your MySQL password
  database: 'sfs',  // Your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to add a course
app.post('/add-course', (req, res) => {
  const { courseName, courseCode, courseFaculty } = req.body;

  const query = 'INSERT INTO courses (course_name, course_code, faculty) VALUES (?, ?, ?)';
  db.query(query, [courseName, courseCode, courseFaculty], (err, result) => {
    if (err) {
      console.error('Error inserting course:', err);
      return res.status(500).json({ message: 'Error adding course' });
    }
    res.status(200).json({ message: 'Course added successfully', courseId: result.insertId });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
