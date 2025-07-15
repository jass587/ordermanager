'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Wireless Mouse',
        price: 799.99,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Mechanical Keyboard',
        price: 2499.50,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Gaming Monitor',
        price: 15999.00,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Bluetooth Headphones',
        price: 1999.99,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Smartphone Stand',
        price: 499.00,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Fitness Tracker',
        price: 3499.95,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Yoga Mat',
        price: 899.99,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'USB-C Hub',
        price: 1499.00,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Portable SSD',
        price: 6499.99,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Webcam HD',
        price: 2299.00,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
