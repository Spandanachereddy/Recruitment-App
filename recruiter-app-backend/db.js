// db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.PLANETSCALE_DATABASE_URL
});

module.exports = pool.promise();
