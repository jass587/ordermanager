"use strict";
const imageURLs = require("../utils/seedData/imageUrls");

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];
    const imgUrls = imageURLs;

    const categoryData = {
      1: {
        name: "Electronics",
        priceRange: [100, 400],
        titles: [
          "Wireless Headphones", "Bluetooth Earbuds", "Smartphone Gimbal", "Noise Cancelling Headset",
          "Power Bank 20000mAh", "Tablet Stand", "USB Wall Charger", "Portable SSD",
          "Smart Plug", "Bluetooth Transmitter"
        ]
      },
      2: {
        name: "Books",
        priceRange: [10, 50],
        titles: [
          "Hardcover Novel", "Science Encyclopedia", "Travel Diary", "Cookbook Deluxe",
          "Mystery Thriller", "Fantasy Saga Vol.1", "Self Help Guide", "Productivity Hacks",
          "Children's Storybook", "Classic Literature Set"
        ]
      },
      3: {
        name: "Clothing",
        priceRange: [15, 80],
        titles: [
          "Cotton T-Shirt", "Slim Fit Jeans", "Hooded Sweatshirt", "Graphic Tee", "Polo Shirt",
          "Athletic Shorts", "Denim Jacket", "Woolen Scarf", "Rain Jacket", "Running Shoes"
        ]
      },
      4: {
        name: "Home & Kitchen",
        priceRange: [20, 100],
        titles: [
          "Non-stick Frying Pan", "Blender Mixer", "Electric Kettle", "Kitchen Utensil Set",
          "Microwave Rack", "Glass Container Set", "Induction Cooktop", "Silicone Baking Mat",
          "Knife Set", "Cutting Board Combo"
        ]
      },
      5: {
        name: "Beauty & Personal Care",
        priceRange: [10, 60],
        titles: [
          "Facial Cleanser", "Organic Shampoo", "Moisturizing Cream", "Beard Trimmer",
          "Lip Balm Pack", "Hair Dryer", "Nail Clippers", "Face Serum", "Sunscreen SPF 50", "Aloe Vera Gel"
        ]
      },
      6: {
        name: "Toys & Games",
        priceRange: [15, 70],
        titles: [
          "Building Blocks Set", "Remote Control Car", "Puzzle Cube", "Board Game Deluxe",
          "Stuffed Animal", "Drawing Kit", "Toy Keyboard", "Water Gun", "Play Tent", "Magic Trick Set"
        ]
      },
      7: {
        name: "Sports & Outdoors",
        priceRange: [25, 120],
        titles: [
          "Yoga Mat", "Skipping Rope", "Dumbbell Set", "Camping Tent", "Hiking Backpack",
          "Foldable Chair", "Tennis Racket", "Cricket Bat", "Swim Goggles", "Cycling Gloves"
        ]
      },
      8: {
        name: "Automotive",
        priceRange: [10, 50],
        titles: [
          "Car Phone Mount", "Dashboard Camera", "Tire Inflator", "Seat Cushion",
          "Steering Wheel Cover", "FM Transmitter", "Car Vacuum", "Sun Shade Visor",
          "Car Wash Mitt", "LED Headlights"
        ]
      },
      9: {
        name: "Garden & Outdoor",
        priceRange: [30, 90],
        titles: [
          "LED Garden Lights", "Watering Can", "Outdoor Swing", "Garden Hose Reel",
          "Compost Bin", "Pruning Shears", "Raised Bed", "BBQ Stand",
          "Mosquito Net", "Solar Garden Statue"
        ]
      },
      10: {
        name: "Health & Wellness",
        priceRange: [15, 60],
        titles: [
          "Digital Thermometer", "Blood Pressure Monitor", "Pulse Oximeter", "First Aid Kit",
          "Yoga Roller", "Essential Oils", "Massage Gun", "Weight Scale", "Neck Pillow", "Eye Mask"
        ]
      }
    };

    const description = "Top-rated product in its category.";

    for (const [id, data] of Object.entries(categoryData)) {
      const urls = imgUrls[data.name] || [];
      data.titles.forEach((title) => {
        const image = urls[Math.floor(Math.random() * urls.length)];
        const price = (Math.random() * (data.priceRange[1] - data.priceRange[0]) + data.priceRange[0]).toFixed(2);

        products.push({
          title,
          price,
          categoryId: Number(id),
          description,
          image,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
    }

    await queryInterface.bulkInsert("Products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  }
};
