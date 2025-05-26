const db = require('../db/mysql');

const bookTickets = (req, res) => {
    // console.log(req.body);
    
  const eventId = req.body.event_id;
  const userId = req.user.id;

  db.query(`SELECT available_seats FROM events WHERE id = ?`, [eventId], (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ message: 'Event not found' });
    if (results[0].available_seats <= 0) return res.status(400).json({ message: 'No seats available' });

    db.query(`INSERT INTO bookings (user_id, event_id) VALUES (?, ?)`, [userId, eventId], (err) => {
      if (err) return res.status(500).json(err);

      db.query(`UPDATE events SET available_seats = available_seats - 1 WHERE id = ?`, [eventId]);
      res.json({ message: 'Booking successful' });
    });
  });
};

const getUserBookings = (req, res) => {

  db.query(`SELECT b.id, e.title, e.date_time FROM bookings b JOIN events e ON b.event_id = e.id WHERE b.user_id = ?`, [req.user.id], (err, results) => {
    // console.log(results);
    
    if (err) return res.status(500).json(err);


    res.json(results);
  });
};

const cancelBooking = (req, res) => {
  const bookingId = req.params.id;
  const userId = req.user.id;

  db.query(`SELECT * FROM bookings WHERE id = ? AND user_id = ?`, [bookingId, userId], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: 'Booking not found' });

    const eventId = results[0].event_id;
    db.query(`DELETE FROM bookings WHERE id = ?`, [bookingId], (err) => {
      if (err) return res.status(500).json(err);
      db.query(`UPDATE events SET available_seats = available_seats + 1 WHERE id = ?`, [eventId]);
      res.json({ message: 'Booking canceled' });
    });
  });
};

module.exports = {bookTickets,getUserBookings,cancelBooking}
