'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'provider', {
      type: Sequelize.ENUM('local', 'google', 'github', 'twitter'),
      allowNull: false,
      defaultValue: 'local',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'provider');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Users_provider";'
    );
  },
};
