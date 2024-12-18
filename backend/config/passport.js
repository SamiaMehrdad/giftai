const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value;
            let user = await User.findOne({ email });
            if (!user) {
                user = await User.create({ email, name: profile.displayName, isVerified: true });
            }
            done(null, user);
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/facebook/callback`,
            profileFields: ["id", "displayName", "emails"],
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value;
            let user = await User.findOne({ email });
            if (!user) {
                user = await User.create({ email, name: profile.displayName, isVerified: true });
            }
            done(null, user);
        }
    )
);
