const express = require("express");
const Member = require("../models/Member");
const Trainer = require("../models/Trainer");
const ClassBooking = require("../models/ClassBooking");
const authGuard = require("../middleware/authGuard");

const router = express.Router();

router.post("/auth/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    let member = await Member.findOne({ email });
    if (!member) {
      member = await Member.create({
        name: req.body.name || "FitZone Member",
        email,
        phone: req.body.phone || "0000000000"
      });
    }

    res.status(200).json({
      member,
      token: member._id.toString(),
      role: "Member"
    });
  } catch (err) {
    next(err);
  }
});

router.get("/trainers", async (req, res, next) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (err) {
    next(err);
  }
});

router.post("/bookings", authGuard, async (req, res, next) => {
  try {
    const booking = await ClassBooking.create({
      ...req.body,
      memberId: req.member.id
    });
    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
});

router.get("/bookings/my", authGuard, async (req, res, next) => {
  try {
    const bookings = await ClassBooking.find({ memberId: req.member.id })
      .populate("memberId", "name email")
      .populate("trainerId", "name specialization");

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
});

router.patch("/bookings/:id/status", authGuard, async (req, res, next) => {
  try {
    const booking = await ClassBooking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
