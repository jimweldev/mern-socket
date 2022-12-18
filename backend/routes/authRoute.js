const express = require('express');

const { login, register } = require('../controllers/authController');

const router = express.Router();

// Login user
router.post('/login', login);

// Register user
router.post('/register', register);

module.exports = router;
