const db = require('../db/mysql');

db.query(`
  CREATE TABLE
  IF NOT EXISTS 
  events 
  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    date_time DATETIME,
    location VARCHAR(255),
    total_seats INT,
    available_seats INT
  )
`);