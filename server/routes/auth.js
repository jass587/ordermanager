// server/routes/auth.js
const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');
const defineUser = require('../models/user');
const { comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

// Setup DB connection and model
const sequelize = new Sequelize('ecommerce_db', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = defineUser(sequelize, DataTypes);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 404,
        result: [],
      });
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
        status: 401,
        result: [],
      });
    }

    const token = generateToken({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    return res.status(200).json({
      message: 'Login successful',
      status: 200,
      result: [{ token }],
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Login failed',
      status: 500,
      result: [],
      error: err.message,
    });
  }
});

router.post('/logout', (req, res) => {
  return res.status(200).json({
    message: 'Logout successful',
    status: 200,
    result: [],
  });
});

module.exports = router;
