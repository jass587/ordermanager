require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin123',
    database: process.env.DB_NAME || 'ecommerce_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Required for Render
      }
    }
  }
};
