const db = require('../models');
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role'],
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 404,
        result: [],
      });
    }

    return res.status(200).json({
      message: 'Profile fetched successfully',
      status: 200,
      result: [user],
    });
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json({
      message: 'Failed to fetch profile',
      status: 500,
      result: [],
      error: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 404,
        result: [],
      });
    }

    const { name, email, password } = req.body;

    user.name = name;
    user.email = email;

    if (password && password.trim() !== '') {
      const hashed = await bcrypt.hash(password, 10);
      user.password_hash = hashed; 
    }

    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      status: 200,
      result: [{ id: user.id, name: user.name, email: user.email, role: user.role }],
    });
  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({
      message: 'Failed to update profile',
      status: 500,
      result: [],
      error: err.message,
    });
  }
};
