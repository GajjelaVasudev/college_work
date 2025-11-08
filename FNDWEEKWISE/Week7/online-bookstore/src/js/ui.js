// src/js/ui.js
import { updateCartUI } from './cart.js';

export function setupUI() {
  // create a container for books if not in HTML
  let bookSection = document.getElementById('book-list');
  if (!bookSection) {
    bookSection = document.createElement('section');
    bookSection.id = 'book-list';
    document.body.appendChild(bookSection);
  }

  // create a cart section
  const cartSection = document.createElement('section');
  cartSection.id = 'cart';
  cartSection.innerHTML = `
    <h2>Your Cart</h2>
    <p>Your cart is empty.</p>
  `;
  document.body.appendChild(cartSection);

  // ensure UI shows current cart state
  updateCartUI();
}
