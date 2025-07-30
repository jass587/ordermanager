const GitHubStrategy = require('passport-github2').Strategy;
const { Sequelize, DataTypes } = require('sequelize');
const defineUser = require('../../models/user');

// Initialize Sequelize
const sequelize = new Sequelize('ecommerce_db', 'postgres', 'admin123', {
  host: 'localhost',
  dialect: 'postgres',
});
const User = defineUser(sequelize, DataTypes);

module.exports = (passport) => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
      const [user] = await User.findOrCreate({
        where: { email },
        defaults: {
          name: profile.displayName || profile.username,
          role: 'user',
          password_hash: 'social-login',
        },
      });
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
};
