    const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// ✅ POST feedback
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.json({ message: "Feedback saved!", feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET all feedback
router.get("/", async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
