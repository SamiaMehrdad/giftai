const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    metadata: { type: Object },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("History", historySchema);
