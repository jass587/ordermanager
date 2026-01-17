const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../../models');

const User = db.User;

module.exports = (passport) => {
  console.log('Google Strategy initialized');
  console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName;

          if (!email) return done(new Error('Email not provided'));
          const [user] = await User.findOrCreate({
            where: { email },
            defaults: {
              name,
              password_hash: null,
              role: 'user',
              provider: 'google',
            },
          });
          done(null, user);
        } catch (err) {
          console.log('error', err);
          done(err);
        }
      }
    )
  );
};
