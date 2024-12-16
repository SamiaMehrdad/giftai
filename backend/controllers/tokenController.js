const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const getTokens = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ tokens: user.tokens });
});

const resetTokens = asyncHandler(async (req, res) => {
    const users = await User.updateMany({}, { $set: { tokens: 100 } });
    res.json({ message: "Tokens reset for all users" });
});

module.exports = { getTokens, resetTokens };
