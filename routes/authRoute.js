const express = require('express');
const router = express.Router();
const {signupController, loginController, checkIfLoggedIn} = require('../controllers/authController');

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/status', checkIfLoggedIn);

module.exports = router;