const express = require('express');
const router = express.Router();
const {getAvailableTimes, bookTime} = require('../controllers/bookingController');

router.post('/times', getAvailableTimes);
router.post('/book', bookTime);

module.exports = router;