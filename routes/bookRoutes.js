const express = require('express');
const router = express.Router();

const { bookTickets, getUserBookings, cancelBooking } = require('../controllers/bookControllre');
const { auth } = require('../middlewares/auth');

router.post('/', auth, bookTickets);
router.get('/', auth, getUserBookings);
router.delete('/:id', auth, cancelBooking);

module.exports = router;
