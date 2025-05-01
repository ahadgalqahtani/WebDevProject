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


// Route to handle form submission
app.post('/contact', (req, res) => {
  console.log("Received data:", req.body);
  const { name, email, message, gender, mobile, dob, language } = req.body;
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


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
