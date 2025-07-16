'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Wireless Headphones',
        price: 199.99,
        categoryId: 1,
        description: 'High quality noise-cancelling wireless headphones.',
        image: 'https://images.unsplash.com/photo-1580894894513-fb49a2dbb3e4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Gaming Mouse',
        price: 49.99,
        categoryId: 1,
        description: 'Ergonomic gaming mouse with RGB lighting.',
        image: 'https://images.unsplash.com/photo-1587202372775-9891b21eec9b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Bluetooth Speaker',
        price: 89.99,
        categoryId: 2,
        description: 'Portable speaker with powerful bass.',
        image: 'https://images.unsplash.com/photo-1581276879432-15a1f54441f4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smartwatch',
        price: 149.99,
        categoryId: 2,
        description: 'Smartwatch with fitness tracking and notifications.',
        image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Laptop Stand',
        price: 34.99,
        categoryId: 3,
        description: 'Adjustable aluminum laptop stand for desks.',
        image: 'https://images.unsplash.com/photo-1616627986313-e3ff8b8bfcfd',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'USB-C Hub',
        price: 59.99,
        categoryId: 3,
        description: 'Multi-port USB-C hub with HDMI and Ethernet.',
        image: 'https://images.unsplash.com/photo-1633678941920-51f7a3bfb1c3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Mechanical Keyboard',
        price: 99.99,
        categoryId: 1,
        description: 'Backlit mechanical keyboard with blue switches.',
        image: 'https://images.unsplash.com/photo-1610465291513-8b8b13cd12c6',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Fitness Tracker',
        price: 79.99,
        categoryId: 2,
        description: 'Water-resistant fitness tracker with heart-rate monitor.',
        image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'External Hard Drive',
        price: 119.99,
        categoryId: 3,
        description: '1TB external hard drive with USB 3.0 support.',
        image: 'https://images.unsplash.com/photo-1580927752452-89f635d58aa1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smart Light Bulb',
        price: 24.99,
        categoryId: 2,
        description: 'WiFi-enabled smart bulb compatible with Alexa and Google.',
        image: 'https://images.unsplash.com/photo-1585386959984-a41552262f1b',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
