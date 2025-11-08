// src/components/BookCard.jsx
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <img
        src={book.cover}
        alt={book.title}
        style={{
          width: "90px",
          height: "130px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
      />

      <div>
        <h2>{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Price:</strong> ₹{book.price}</p>

        <Link
          to={`/book/${book.id}`}
          className="details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
