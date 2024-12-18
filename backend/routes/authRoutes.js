const express = require("express");
const passport = require("passport");
const { checkEmail, setOrResetPassword, login, forgotPassword } = require("../controllers/authController");

const router = express.Router();

// Local Authentication
router.post("/check-email", checkEmail);
router.post("/set-password", setOrResetPassword);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

// Social Authentication - Google
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.send("Google Login Success");
});

// Social Authentication - Facebook
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook"), (req, res) => {
    res.send("Facebook Login Success");
});

module.exports = router;
