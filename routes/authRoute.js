const express = require('express');
const router = express.Router();
const {signupController, loginController, checkIfLoggedIn, logout} = require('../controllers/authController');

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/status', checkIfLoggedIn);
router.delete('/logout', logout);
module.exports = router;