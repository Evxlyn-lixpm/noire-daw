function renderCart() {
  const container = document.getElementById("cart-container");
  const cart = getCart();

  if (!cart.length) {
    container.innerHTML = `
      <div class="status">
        Tu bag está vacía 🖤<br><br>
        <a class="btn btn-light" href="catalogo.html">Explorar colección</a>
      </div>
    `;
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  container.innerHTML = `
    <div class="cart-table">
      ${cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <strong>${item.name}</strong>
            <p class="product-price">${money(item.price)} · Cantidad: ${item.quantity}</p>
          </div>
          <strong>${money(item.price * item.quantity)}</strong>
          <button class="remove" onclick="removeItem(${item.id})">Eliminar</button>
        </div>
      `).join("")}

      <div class="cart-total">
        <p class="eyebrow">TOTAL</p>
        <h2>${money(total)}</h2>
        <button class="btn btn-light" onclick="checkout()">Finalizar compra</button>
      </div>
    </div>
  `;
}

function removeItem(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
}

function checkout() {
  alert("Demo de checkout: tu pedido fue preparado 🖤");
}

renderCart();