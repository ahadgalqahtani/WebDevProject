const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'masarrah',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

// Route to handle form submission
app.post('/contact', (req, res) => {
  const { name, gender, mobile, dob, email, language, message } = req.body;
  const sql = `
    INSERT INTO contact_messages (name, gender, mobile, dob, email, language, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(sql, [name, gender, mobile, dob, email, language, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Server error');
    } else {
      res.send('Message received!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
