const mysql = require('mysql2/promise');
const path = require('path');

// Load DB config (development)
const config = require(path.join(__dirname, 'config.json'))['development'];

// Create a pool for queries
const pool = mysql.createPool({
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
