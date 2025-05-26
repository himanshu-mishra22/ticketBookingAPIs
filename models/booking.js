const db = require('../db/mysql');

db.query(`
  CREATE TABLE
  IF NOT EXISTS 
  bookings 
  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    event_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
  )
`);
