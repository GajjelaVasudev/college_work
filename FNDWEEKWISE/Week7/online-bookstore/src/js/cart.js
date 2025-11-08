// src/js/cart.js
let cart = [];

export function addToCart(book) {
  const existing = cart.find(item => item.id === book.id);
  if (!existing) {
    cart.push(book);
  }
  updateCartUI();
}

export function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

export function getCartTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

export function updateCartUI() {
  const cartContainer = document.getElementById('cart');
  cartContainer.innerHTML = '<h2>Your Cart</h2>';

  if (cart.length === 0) {
    cartContainer.innerHTML += '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.title} - ₹${item.price}</span>
      <button data-id="${item.id}">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  const total = document.createElement('p');
  total.innerHTML = `<strong>Total: ₹${getCartTotal()}</strong>`;
  cartContainer.appendChild(total);

  document.querySelectorAll('.cart-item button').forEach(btn => {
    btn.addEventListener('click', e => {
      removeFromCart(parseInt(e.target.dataset.id));
    });
  });
}
