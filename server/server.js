const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.sequelize.sync(); // use { alter: true } or { force: true } if needed
    console.log('✅ Database synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
