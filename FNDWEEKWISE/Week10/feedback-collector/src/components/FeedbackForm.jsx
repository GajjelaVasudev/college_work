// src/components/FeedbackForm.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeedback } from "../redux/feedbackSlice";

export default function FeedbackForm() {
  const dispatch = useDispatch();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      rating: Number(rating),
      comment: comment.trim()
    };

    dispatch(addFeedback(newFeedback));

    // Clear form after submit
    setRating("");
    setComment("");
  };

  return (
    <div className="feedback-box">
      <h2>Give Your Feedback</h2>

      <form onSubmit={handleSubmit}>
        <label>Rating (1–5):</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="">Select</option>
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="5">5 ⭐</option>
        </select>

        <label>Comments:</label>
        <textarea
          placeholder="Enter your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}
