// src/components/FeedbackItem.jsx

export default function FeedbackItem({ item }) {
  return (
    <div className="feedback-item">
      <p><strong>Rating:</strong> {item.rating} ⭐</p>
      {item.comment && <p><strong>Comment:</strong> {item.comment}</p>}
    </div>
  );
}
