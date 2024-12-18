const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../services/emailService");
const generateToken = require("../utils/generateToken");

// Step 1: Check if email exists or send verification email for new user
const checkEmail = (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });

    User.findOne({ email })
        .then((user) => {
            if (user) {
                return res.json({ exists: true, message: "User exists. Proceed to password entry." });
            }
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            const link = `${process.env.FRONTEND_URL}/set-password?token=${token}`;

            return sendEmail(
                email,
                "Set Your Password",
                `<p>Welcome! Click <a href="${link}">here</a> to set your password.</p>`
            ).then(() =>
                res.json({
                    exists: false,
                    message: "Verification email sent. Please check your inbox.",
                })
            );
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Server error. Please try again later." });
        });
};

// Step 2: Set or Reset Password (Combined)
const setOrResetPassword = (req, res) => {
    const { token, password } = req.body;

    if (!token || !password) {
        return res.status(400).json({ message: "Token and password are required." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(400).json({ message: "Invalid or expired token." });

        const email = decoded.email;

        User.findOne({ email })
            .then((user) => {
                if (!user) {
                    // New user registration
                    return bcrypt
                        .hash(password, 10)
                        .then((hashedPassword) => User.create({ email, password: hashedPassword, isVerified: true }))
                        .then((newUser) =>
                            res.json({
                                message: "Password set successfully. You can now log in.",
                                token: generateToken(newUser._id),
                            })
                        );
                }

                // Existing user resets password
                return bcrypt
                    .hash(password, 10)
                    .then((hashedPassword) => {
                        user.password = hashedPassword;
                        return user.save();
                    })
                    .then(() => res.json({ message: "Password reset successfully. You can now log in." }));
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "Server error. Please try again later." });
            });
    });
};

// Step 3: Login (Existing User)
const login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    User.findOne({ email })
        .then((user) => {
            if (!user) return res.status(400).json({ message: "User not found." });

            return bcrypt.compare(password, user.password).then((isMatch) => {
                if (!isMatch) return res.status(401).json({ message: "Invalid password." });

                res.json({
                    message: "Login successful.",
                    token: generateToken(user._id),
                });
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Server error. Please try again later." });
        });
};

// Step 4: Forgot Password - Send Reset Link
const forgotPassword = (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required." });

    User.findOne({ email })
        .then((user) => {
            if (!user) return res.status(400).json({ message: "User not found." });

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            const link = `${process.env.FRONTEND_URL}/set-password?token=${token}`;

            return sendEmail(
                email,
                "Reset Your Password",
                `<p>Forgot your password? Click <a href="${link}">here</a> to reset it.</p>`
            ).then(() => res.json({ message: "Password reset email sent. Please check your inbox." }));
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Server error. Please try again later." });
        });
};

module.exports = { checkEmail, setOrResetPassword, login, forgotPassword };
