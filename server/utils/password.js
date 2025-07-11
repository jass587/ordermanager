// server/utils/password.js
const bcrypt = require('bcrypt');

const hashPassword = async (plainText) => {
  return await bcrypt.hash(plainText, 10);
};

const comparePassword = async (plainText, hashed) => {
  return await bcrypt.compare(plainText, hashed);
};

module.exports = {
  hashPassword,
  comparePassword,
};
