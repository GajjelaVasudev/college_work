// src/pages/BookDetail.jsx
import { useParams, Link } from "react-router-dom";
import books from "../data/books.js";

export default function BookDetail() {
  const { id } = useParams();
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Book Not Found</h2>
        <Link to="/" style={{ color: "blue" }}>Go Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
      <img
        src={book.cover}
        alt={book.title}
        style={{
          width: "250px",
          height: "350px",
          objectFit: "cover",
          borderRadius: "12px",
          display: "block",
          marginBottom: "20px",
        }}
      />

      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ₹{book.price}</p>

      <p style={{ marginTop: "10px", lineHeight: "1.5" }}>
        {book.description}
      </p>

      <Link
        to="/"
        style={{
          marginTop: "25px",
          display: "inline-block",
          padding: "10px 15px",
          background: "black",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}
