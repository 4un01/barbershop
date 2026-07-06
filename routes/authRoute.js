const express = require('express');
const router = express.Router();
const {signupController, loginController} = require('../controllers/authController');

router.post('/signup', signupController);
router.get('/login', loginController);

module.exports = router;