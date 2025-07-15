'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Wireless Headphones',
        price: 199.99,
        categoryId: 1,
        description: 'High quality noise-cancelling wireless headphones.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Gaming Mouse',
        price: 49.99,
        categoryId: 1,
        description: 'Ergonomic gaming mouse with RGB lighting.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bluetooth Speaker',
        price: 89.99,
        categoryId: 2,
        description: 'Portable speaker with powerful bass.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smartwatch',
        price: 149.99,
        categoryId: 2,
        description: 'Smartwatch with fitness tracking and notifications.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Laptop Stand',
        price: 34.99,
        categoryId: 3,
        description: 'Adjustable aluminum laptop stand for desks.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'USB-C Hub',
        price: 59.99,
        categoryId: 3,
        description: 'Multi-port USB-C hub with HDMI and Ethernet.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mechanical Keyboard',
        price: 99.99,
        categoryId: 1,
        description: 'Backlit mechanical keyboard with blue switches.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fitness Tracker',
        price: 79.99,
        categoryId: 2,
        description: 'Water-resistant fitness tracker with heart-rate monitor.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'External Hard Drive',
        price: 119.99,
        categoryId: 3,
        description: '1TB external hard drive with USB 3.0 support.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smart Light Bulb',
        price: 24.99,
        categoryId: 2,
        description: 'WiFi-enabled smart bulb compatible with Alexa and Google.',
        image: 'https://via.placeholder.com/150',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
