const API_URL = "https://noire-api-6wp0.onrender.com/api";


async function apiFetch(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  return response.json();
}

function money(value) {
  return `S/ ${Number(value).toFixed(2)}`;
}

function getCart() {
  return JSON.parse(localStorage.getItem("noire-cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("noire-cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  alert(`${product.name} fue agregado a tu bag 🖤`);
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
}

document.addEventListener("DOMContentLoaded", updateCartCount);