const mongoose = require("mongoose");

const classBookingSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
  className: { type: String, required: true, minlength: 2 },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true, minlength: 2 },
  status: {
    type: String,
    enum: ["booked", "attended", "cancelled"],
    default: "booked"
  }
});

module.exports = mongoose.model("ClassBooking", classBookingSchema);
