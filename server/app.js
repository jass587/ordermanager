const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const db = require('./models');

// Load env vars from .env
dotenv.config();

// Import passport strategies
require('./utils/passport/github2')(passport);
require('./utils/passport/google')(passport);
require('./utils/passport/google')(passport)
require('./utils/passport/twitter')(passport);

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (required for passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboardcat',
  resave: false,
  saveUninitialized: false,
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Sync DB and Start Server
const startServer = async () => {
  try {
    await db.sequelize.sync(); // use alter:true or force:true if needed

    console.log('✅ Database synced');

    app.listen(5000, () => {
      console.log('🚀 Server started on http://localhost:5000');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
