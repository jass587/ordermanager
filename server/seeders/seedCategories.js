"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [
      { name: "Electronics", createdAt: new Date(), updatedAt: new Date() },
      { name: "Books", createdAt: new Date(), updatedAt: new Date() },
      { name: "Clothing", createdAt: new Date(), updatedAt: new Date() },
      { name: "Home & Kitchen", createdAt: new Date(), updatedAt: new Date() },
      { name: "Beauty & Personal Care", createdAt: new Date(), updatedAt: new Date() },
      { name: "Toys & Games", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sports & Outdoors", createdAt: new Date(), updatedAt: new Date() },
      { name: "Automotive", createdAt: new Date(), updatedAt: new Date() },
      { name: "Garden & Outdoor", createdAt: new Date(), updatedAt: new Date() },
      { name: "Health & Wellness", createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert("Categories", categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
