// server/utils/jwt.js
const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret'; // Use process.env.JWT_SECRET in real projects

function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

module.exports = { generateToken };
