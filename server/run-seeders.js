const { sequelize } = require('./models');

async function runSeeders() {
  try {
    // Dynamically import and run seeders
    const categorySeeder = require('./seeders/seedCategories.js');
    const productSeeder = require('./seeders/seedProducts.js');
    const userSeeder = require('./seeders/seedUsers.js');

    await sequelize.authenticate();

    await categorySeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
    await productSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
    await userSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);

    console.log('✅ Seeders ran successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder Error:', err);
    process.exit(1);
  }
}

runSeeders();
