const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("../../models");

const User = db.User;

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName;

          if (!email) return done(new Error("Email not provided"));

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

    // Required for session-based login
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
