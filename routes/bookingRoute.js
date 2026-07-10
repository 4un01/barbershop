const express = require('express');
const router = express.Router();
const {getAvailableTimes, bookTime, getBookings} = require('../controllers/bookingController');

router.post('/times', getAvailableTimes);
router.post('/book', bookTime);
router.get('/myBookings', getBookings);

module.exports = router;