'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'password_hash', {
      type: Sequelize.STRING,
      allowNull: true, // ✅ allow OAuth users
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'password_hash', {
      type: Sequelize.STRING,
      allowNull: false, // rollback
    });
  },
};
