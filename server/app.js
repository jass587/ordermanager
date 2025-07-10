const express = require('express');
const app = express();
const db = require('./models');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working!');
});

db.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server started on http://localhost:3000'));
});
