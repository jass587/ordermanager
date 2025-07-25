'use strict';

const { hashPassword } = require('../utils/password');

module.exports = {
  async up(queryInterface, Sequelize) {
    const adminPassword = await hashPassword('admin123');
    const userPassword = await hashPassword('user123');

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password_hash: adminPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Normal User',
        email: 'user@example.com',
        password_hash: userPassword,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
