const express = require('express');
const router = express.Router();
const { login, getMe, logout } = require('../controllers/authController');
const { protect, handleValidationErrors } = require('../middleware/auth');
const { loginValidator } = require('../validators/auth');

router.post('/login', loginValidator, handleValidationErrors, login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
