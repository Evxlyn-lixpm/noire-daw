async function loadDetail() {
  const id = new URLSearchParams(location.search).get("id");
  const status = document.getElementById("detail-status");
  const container = document.getElementById("product-detail");

  if (!id) {
    status.textContent = "Producto no especificado.";
    return;
  }

  try {
    const product = await apiFetch(`/products/${id}`);

    status.textContent = "";

    container.innerHTML = `
      <img class="product-detail-image" src="${product.image}" alt="${product.name}">
      <div>
        <p class="eyebrow">NOIRÉ / COLLECTION</p>
        <h1>${product.name}</h1>
        <div class="detail-price">${money(product.price)}</div>
        <p class="detail-description">${product.description}</p>

        <span class="size-label">Selecciona tu talla</span>
        <div class="size-options">
          ${product.sizes.map(size => `<button>${size}</button>`).join("")}
        </div>

        <p class="product-price">Stock disponible: ${product.stock}</p>
        <br>
        <button class="btn btn-light" onclick='addToCart(${JSON.stringify(product)})'>
          Add to bag
        </button>
      </div>
    `;
  } catch {
    status.textContent = "No pudimos encontrar este producto.";
  }
}

loadDetail();