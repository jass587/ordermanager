const TwitterStrategy = require("passport-twitter").Strategy;
const { User } = require("../../models/user");

module.exports = (passport) => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://localhost:5000/api/auth/twitter/callback",
        includeEmail: true,
      },
      async (token, tokenSecret, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.username}@twitter.com`;
          const name = profile.displayName || profile.username;

          const [user] = await User.findOrCreate({
            where: { email },
            defaults: { name, password_hash: "", role: "user" },
          });

          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
