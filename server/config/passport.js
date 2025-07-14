const passport = require('passport');
const githubStrategy = require('../utils/passport/github2');
const googleStrategy = require('../utils/passport/google');
const twitterStrategy = require('../utils/passport/twitter');

module.exports = () => {
  githubStrategy(passport);
  googleStrategy(passport);
  twitterStrategy(passport);

  return passport;
};
