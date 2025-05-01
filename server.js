const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;


// Enable CORS for all origins (development use)
app.use(cors({ origin: '*' }));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'masarrah'
});


db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});


// Route to handle form submission with validation
app.post('/contact', (req, res) => {
  console.log("Received data:", req.body);
  const { name, email, message, gender, mobile, dob, language } = req.body;


  // Validation checks
  if (!name || !email || !message || !gender || !mobile || !dob || !language) {
    return res.status(400).send('All fields are required.');
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format.');
  }


  const mobileRegex = /^\d{9,15}$/;
  if (!mobileRegex.test(mobile)) {
    return res.status(400).send('Invalid mobile number.');
  }


  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }


  if (age < 18) {
    return res.status(400).send('You must be at least 18 years old.');
  }


  const sql = `
    INSERT INTO contact_messages (name, email, message, gender, mobile, dob, language)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;


  db.query(sql, [name, email, message, gender, mobile, dob, language], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Server error');
    } else {
      res.send('Message received!');
    }
  });
});


// Route to save suggestion
app.post('/suggestions', (req, res) => {
  const { message } = req.body;


  if (!message || message.trim() === '') {
    return res.status(400).send('Message is required.');
  }


  const sql = 'INSERT INTO suggestions (message) VALUES (?)';
  db.query(sql, [message], (err, result) => {
    if (err) {
      console.error('Error inserting suggestion:', err);
      return res.status(500).send('Server error');
    }
    res.send('Suggestion submitted successfully!');
  });
});


// Route to fetch contact messages
app.get('/contact/messages', (req, res) => {
  const sql = 'SELECT * FROM contact_messages ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
