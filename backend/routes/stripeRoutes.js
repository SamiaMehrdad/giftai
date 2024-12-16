const express = require("express");
const { createCheckoutSession, handleWebhook } = require("../controllers/stripeController");
const router = express.Router();

router.post("/checkout", createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);

module.exports = router;
