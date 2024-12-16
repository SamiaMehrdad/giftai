const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String },
    tokens: { type: Number, default: 100 },
    socialId: { type: String },
    stripeCustomerId: { type: String },
    savedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "History" }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
