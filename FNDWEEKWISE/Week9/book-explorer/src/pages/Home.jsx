// src/pages/Home.jsx
import books from "../data/books.js";
import BookCard from "../components/BookCard.jsx";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1> Book Explorer</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
