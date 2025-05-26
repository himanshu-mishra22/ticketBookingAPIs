const db = require('../db/mysql');

db.query(`
  CREATE TABLE
  IF NOT EXISTS
  users 
  (
    id INT AUTO_INCREMENT PRIMARY KEY,
   email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user'
)
`);