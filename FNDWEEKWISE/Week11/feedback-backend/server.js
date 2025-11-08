const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Replace <password> with your real password
mongoose
  .connect(
    "mongodb+srv://2400031595:Rameshkumar2025@cluster0.kocgubf.mongodb.net/feedbackDB"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.use("/api/feedback", feedbackRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on port 5000");
});
