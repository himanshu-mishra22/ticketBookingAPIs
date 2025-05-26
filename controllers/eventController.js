const db = require('../db/mysql.js');

const getEvents = (req, res) => {
  db.query(`SELECT * FROM events`, (err, results) => {
    // console.log(results);

    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

const createEvent = (req, res) => {
    // console.log(req.body);
    
  const { title, description, date_time, location, total_seats } = req.body;
  db.query(`INSERT INTO events (title, description, date_time, location, total_seats, available_seats) VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, date_time, location, total_seats, total_seats],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: 'Event created' });
    });
};

const updateEvents = (req, res) => {
    // console.log(req.body);

  const { id } = req.params;
  const { title, description, date_time, location, total_seats } = req.body;

  db.query(`UPDATE events SET title=?, description=?, date_time=?, location=?, total_seats=? WHERE id=?`,
    [title, description, date_time, location, total_seats, id],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: 'Event updated' });
    });
};

const deleteEvents = (req, res) => {
    
  db.query(`DELETE FROM events WHERE id=?`, [req.params.id], (err) => {
    if (err) return res.status(400).json(err);
    res.json({ message: 'Event deleted' });
  });
};

module.exports = {getEvents,createEvent,updateEvents,deleteEvents}
