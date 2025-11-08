// src/components/FeedbackList.jsx
import { useSelector, useDispatch } from "react-redux";
import FeedbackItem from "./FeedbackItem";
import { clearFeedback } from "../redux/feedbackSlice";

export default function FeedbackList() {
  const feedback = useSelector((state) => state.feedback.list);
  const dispatch = useDispatch();

  return (
    <div className="feedback-list-box">
      <h2>Submitted Feedback</h2>

      {feedback.length === 0 ? (
        <p>No feedback yet.</p>
      ) : (
        <div>
          {feedback.map((item) => (
            <FeedbackItem key={item.id} item={item} />
          ))}

          <button
            onClick={() => dispatch(clearFeedback())}
            className="clear-btn"
          >
            Clear All Feedback
          </button>
        </div>
      )}
    </div>
  );
}
