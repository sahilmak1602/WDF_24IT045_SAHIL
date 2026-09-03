const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  specialization: { type: String, required: true, minlength: 2 },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Trainer", trainerSchema);
