require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const connect = require("@planetscale/database")
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());


const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
}


// Database Connection
// const db = mysql.createConnection(config);
const ss = process.env.PLANETSCALE_DATABASE_URL
console.log(ss)
const db = mysql.createConnection(ss)


console.log(db);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});


app.post('/candidates', (req, res) => {
  const {
    name,
    email,
    phone,
    skills,
    status,
    expectedSalary,
    nodeJsExperience,
    reactJsExperience,
  } = req.body;

  // Calculate total score based on Node.js and ReactJS experience
  const totalScore = calculateTotalScore(nodeJsExperience, reactJsExperience);

  const sql =
    'INSERT INTO candidates (name, email, phone, skills, status, expectedSalary, nodeJsExperience, reactJsExperience, totalScore) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    name,
    email,
    phone,
    skills,
    status,
    expectedSalary,
    nodeJsExperience,
    reactJsExperience,
    totalScore,
  ];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error('Error creating candidate:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newCandidate = {
        id: result.insertId,
        name,
        email,
        phone,
        skills,
        status,
        expectedSalary,
        nodeJsExperience,
        reactJsExperience,
        totalScore,
      };
      res.status(201).json(newCandidate);
    }
  });
});
app.get('/candidates', (req, res) => {
  const sql = 'SELECT * FROM candidates';

  db.query(sql, (error, result) => {
    if (error) {
      console.error('Error fetching candidates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const candidates = result;
      res.status(200).json(candidates);
    }
  });
});

app.patch('/candidates/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = 'UPDATE candidates SET status = ? WHERE id = ?';
  const values = [status, id];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error('Error updating candidate status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const updatedCandidate = { id, status, ...result };
      res.status(200).json(updatedCandidate);
    }
  });
});

app.delete('/candidates/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM candidates WHERE id = ?';
  const values = [id];

  db.query(sql, values, (error, result) => {
    if (error) {
      console.error('Error deleting candidate:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const deletedCandidate = { id, ...result };
      res.status(200).json({ message: 'Candidate deleted successfully', deletedCandidate });
    }
  });
});

const calculateExperienceScore = (experience) => {
  if (experience < 1) return 1;
  else if (experience >= 1 && experience <= 2) return 2;
  else return 3;
};

const calculateTotalScore = (nodeJsExperience, reactJsExperience) => {
  const nodejsExperienceScore = calculateExperienceScore(nodeJsExperience);
  const reactjsExperienceScore = calculateExperienceScore(reactJsExperience);
  
  // Calculate the total score as the sum of Node.js and React.js scores
  const totalScore = nodejsExperienceScore + reactjsExperienceScore;

  return totalScore;
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
