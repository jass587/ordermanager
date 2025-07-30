const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const db = require('../models');
const User = db.User;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// GitHub example — repeat for others
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/api/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ where: { email: profile.emails[0].value } });
  if (!user) {
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      role: 'user',
    });
  }
  return done(null, user);
}));

module.exports = passport;
