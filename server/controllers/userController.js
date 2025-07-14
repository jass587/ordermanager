const db = require('../models');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, password } = req.body;

    user.name = name;
    user.email = email;

    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
