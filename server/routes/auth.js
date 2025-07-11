const express = require("express");
const router = express.Router();
const passport = require("passport");
const { generateToken } = require("../utils/jwt");
const { Sequelize, DataTypes } = require('sequelize');
const defineUser = require('../models/user');
const { comparePassword } = require('../utils/password');

const sequelize = new Sequelize('ecommerce_db', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
});
const User = defineUser(sequelize, DataTypes);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body", req.body);
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

// === GitHub ===
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback",
  passport.authenticate("github", { failureRedirect: "/signin" }),
  (req, res) => {
    const token = generateToken({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });

    res.redirect(`http://localhost:5173/social-login-success?token=${token}`);
  }
);

// === Google ===
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    const token = generateToken({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });

    res.redirect(`http://localhost:5173/social-login-success?token=${token}`);
  }
);

// === Facebook ===
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/signin" }),
  (req, res) => {
    const token = generateToken({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });

    res.redirect(`http://localhost:5173/social-login-success?token=${token}`);
  }
);

// === Twitter ===
router.get("/twitter", passport.authenticate("twitter"));

router.get("/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/signin" }),
  (req, res) => {
    const token = generateToken({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });

    res.redirect(`http://localhost:5173/social-login-success?token=${token}`);
  }
);

module.exports = router;
