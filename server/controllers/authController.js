const { comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');
const { User } = require('../models');

exports.login = async (req, res) => {
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
};

exports.logout = (req, res) => {
  try {
    return res.status(200).json({
      message: 'Logout successful',
      status: 200,
      result: [],
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Logout failed',
      status: 500,
      result: [],
      error: err.message,
    });
  }
};

exports.socialCallback = (req, res) => {
  try {
    const token = generateToken({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    });

    return res.redirect(`http://localhost:5173/social-login-success?token=${token}`);
  } catch (err) {
    return res.status(500).json({
      message: 'Social login failed',
      status: 500,
      result: [],
      error: err.message,
    });
  }
};
