const express = require('express');
const authController = require('../controllers/authControllers');
const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);

module.exports = router;