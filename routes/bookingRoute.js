const express = require('express');
const router = express.Router();
const {getAvailableTimes} = require('../controllers/bookingController');

router.post('/times', getAvailableTimes);

module.exports = router;