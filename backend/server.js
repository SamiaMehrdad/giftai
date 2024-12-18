const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("./config/db");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
//const projectRoutes = require("./routes/projectRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
//const tokenRoutes = require("./routes/tokenRoutes");

const app = express();

// Enable CORS for all routes
app.use(
    cors({
        origin: "http://localhost:3000", // Allow requests from your React app's URL
        methods: ["GET", "POST"], // Allow GET and POST methods
        allowedHeaders: ["Content-Type"], // Allow specific headers
    })
);

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
//app.use("/api/projects", projectRoutes);
app.use("/api/stripe", stripeRoutes);
//app.use("/api/tokens", tokenRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
