const express = require('express');
const app = express();
const db = require('./models');
const authRoutes = require('./routes/auth');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Api is working")
})
const startServer = async () => {
  try {
    db.sequelize.sync();           // safer
    db.sequelize.sync({ alter: true });// or { force: true } or { alter: true }
    console.log('Database synced');
    
    app.listen(5000, () => {
      console.log('Server started on http://localhost:5000');
    });
  } catch (err) {
    console.error('Failed to sync database:', err);
    process.exit(1); // Optional: exit process on failure
  }
};

startServer();
