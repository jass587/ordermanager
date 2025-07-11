// server/seedUsers.js
const { Sequelize, DataTypes } = require('sequelize');
const { hashPassword } = require('../utils/password');
const defineUser = require('../models/user');

const sequelize = new Sequelize('ecommerce_db', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = defineUser(sequelize, DataTypes);

const seed = async () => {
  await sequelize.sync({ force: true }); // WARNING: drops and recreates table

  const adminPassword = await hashPassword('admin123');
  const userPassword = await hashPassword('user123');

  await User.bulkCreate([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password_hash: adminPassword,
      role: 'admin',
    },
    {
      name: 'Normal User',
      email: 'user@example.com',
      password_hash: userPassword,
      role: 'user',
    },
  ]);

  console.log('Dummy users created.');
  await sequelize.close();
};

seed();
