// src/js/books.js
import { addToCart } from './cart.js';

export async function loadBooks() {
  try {
    const response = await fetch('/src/data/books.json');
    const books = await response.json();

    const bookContainer = document.getElementById('book-list');
    bookContainer.innerHTML = ''; // clear old data if any

    books.forEach(book => {
      const card = document.createElement('div');
      card.className = 'book-card';

      card.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Price:</strong> ₹${book.price}</p>
        <p>${book.available ? " In Stock" : " Out of Stock"}</p>
        <button ${!book.available ? 'disabled' : ''} data-id="${book.id}">
          Add to Cart
        </button>
      `;

      // Add to cart functionality
      const button = card.querySelector('button');
      if (book.available) {
        button.addEventListener('click', () => addToCart(book));
      }

      bookContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading books:", error);
  }
}
