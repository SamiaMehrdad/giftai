const express = require("express");
const { getTokens, resetTokens } = require("../controllers/tokenController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, getTokens);
router.post("/reset", resetTokens);

module.exports = router;
