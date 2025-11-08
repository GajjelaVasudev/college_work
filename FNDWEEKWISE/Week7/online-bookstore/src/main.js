// src/main.js
import './style.css';
import { loadBooks } from './js/books.js';
import { setupUI } from './js/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  setupUI();   // creates the book-list and cart sections
  loadBooks(); // loads JSON data and displays books
});
