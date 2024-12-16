const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const tokenMiddleware = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (user.tokens <= 0) {
        res.status(403);
        throw new Error("Insufficient tokens");
    }
    next();
});

module.exports = tokenMiddleware;
