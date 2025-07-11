const FacebookStrategy = require("passport-facebook").Strategy;
const defineUser = require('../../models/user');

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/facebook/callback",
        profileFields: ["id", "emails", "name", "displayName"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName || `${profile.name.givenName} ${profile.name.familyName}`;

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
};
