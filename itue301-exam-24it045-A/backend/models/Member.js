const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, minlength: 10 },
  membershipType: {
    type: String,
    enum: ["basic", "premium", "platinum"],
    default: "basic"
  }
});

module.exports = mongoose.model("Member", memberSchema);
