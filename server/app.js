const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const passportConfig = require('./config/passport');
const uploadRoute = require("./routes/upload");


// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Health check
app.get('/', (req, res) => {
  res.send('API is working');
});

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

// Passport init
const passport = passportConfig();
app.use(passport.initialize());
app.use(passport.session());

//File upload
app.use("/uploads", express.static("uploads")); // serve static files
app.use("/upload", uploadRoute);

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const stripeRoutes = require("./routes/stripe");
const orderRoutes = require("./routes/orders");
const orderItemRoutes = require("./routes/orderItems");
const paymentRoutes = require("./routes/payments");

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/payments", paymentRoutes);

module.exports = app;
