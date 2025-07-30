const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

// GET user profile
router.get('/', authenticateToken, userController.getProfile);

// PUT update user profile
router.put('/update', authenticateToken, userController.updateProfile);

module.exports = router;
