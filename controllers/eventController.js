const db = require('../db/mysql.js');

const getEvents = (req, res) => {
  const { page = 1, limit = 10, search = '', date_from, date_to } = req.query;

  const offset = (Number(page) - 1) * Number(limit);
  const filters = [];
  const values = [];

  if (search.trim()) {
    filters.push(`(title LIKE ? OR description LIKE ?)`);
    values.push(`%${search}%`, `%${search}%`);
  }

  if (date_from) {
    filters.push(`date_time >= ?`);
    values.push(new Date(date_from));
  }
  if (date_to) {
    filters.push(`date_time <= ?`);
    values.push(new Date(date_to));
  }

  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

  const countQuery = `SELECT COUNT(*) as total FROM events ${whereClause}`;
  db.query(countQuery, values, (err, countResults) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    const total = countResults[0].total;
    const pageCount = Math.ceil(total / limit);

    const dataQuery = `
      SELECT * FROM events 
      ${whereClause} 
      ORDER BY date_time ASC 
      LIMIT ? OFFSET ?`;
    db.query(dataQuery, [...values, Number(limit), offset], (err, events) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });

      res.json({
        page: Number(page),
        total,
        pageCount,
        events,
      });
    });
  });
};

const createEvent = (req, res) => {
    // console.log(req.body);
    
  const { title, description, date_time, location, total_seats } = req.body;

  if (!isNonEmptyString(title)) return res.status(400).json({ message: 'Title is required' });
  if (!isNonEmptyString(description)) return res.status(400).json({ message: 'Description is required' });
  if (!isValidDate(date_time)) return res.status(400).json({ message: 'Invalid date/time format' });
  if (!isNonEmptyString(location)) return res.status(400).json({ message: 'Location is required' });
  if (!isPositiveInteger(Number(total_seats))) return res.status(400).json({ message: 'Total seats must be a positive integer' });


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

  if (!isPositiveInteger(Number(id))) return res.status(400).json({ message: 'Invalid event ID' });
  if (!isNonEmptyString(title)) return res.status(400).json({ message: 'Title is required' });
  if (!isNonEmptyString(description)) return res.status(400).json({ message: 'Description is required' });
  if (!isValidDate(date_time)) return res.status(400).json({ message: 'Invalid date/time format' });
  if (!isNonEmptyString(location)) return res.status(400).json({ message: 'Location is required' });
  if (!isPositiveInteger(Number(total_seats))) return res.status(400).json({ message: 'Total seats must be a positive integer' });

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
