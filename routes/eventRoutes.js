const express = require('express');
const router = express.Router();

const { getEvents, createEvent, updateEvents, deleteEvents } = require('../controllers/eventController');
const { auth, forAdmin } = require('../middlewares/auth');

router.get('/', getEvents);
router.post('/', auth, forAdmin, createEvent);
router.put('/:id', auth, forAdmin, updateEvents);
router.delete('/:id', auth, forAdmin, deleteEvents);

module.exports = router;
