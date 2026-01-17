const db = require('../models');
const User = db.User;

const passport = require('passport');
// const githubStrategy = require('../utils/passport/github2');
const googleStrategy = require('../utils/passport/google');
// const twitterStrategy = require('../utils/passport/twitter');

module.exports = () => {
  // githubStrategy(passport);
  googleStrategy(passport);
  // twitterStrategy(passport);

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  return passport;
};
